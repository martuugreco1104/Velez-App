import React, { useState, useEffect } from 'react';
import { SHOP_CATEGORIES, OFFICIAL_SHOP_PRODUCTS } from '../../data/shopData';
import { 
  ShoppingBag, 
  Check, 
  Tag, 
  ArrowRight, 
  ArrowLeft, 
  Shirt, 
  ChevronLeft, 
  ChevronRight,
  Truck,
  Trash2,
  X,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

export default function ClubShop({ onAddToCart, user, onOpenPay, showToast, onProductDetailToggle }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [cartSuccess, setCartSuccess] = useState(false);

  // Carrito de Compras (según referencia oficial Tienda Vélez)
  const [cartItems, setCartItems] = useState([
    {
      ...OFFICIAL_SHOP_PRODUCTS[0],
      chosenSize: 'M',
      quantity: 1
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('pickup'); // 'pickup' | 'delivery'
  const [postalCode, setPostalCode] = useState('1408');
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      const mainEl = document.querySelector('main');
      if (mainEl) mainEl.scrollTo({ top: 0, behavior: 'smooth' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedProduct]);

  const filteredProducts = selectedCategory === 'Todos'
    ? OFFICIAL_SHOP_PRODUCTS
    : OFFICIAL_SHOP_PRODUCTS.filter(p => p.category === selectedCategory);

  const handleOpenDetail = (product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0] || 'M');
    setActivePhotoIdx(0);
    onProductDetailToggle?.(true);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
    onProductDetailToggle?.(false);
  };

  const handleAddToCart = (openDrawer = false) => {
    const itemToAdd = {
      ...selectedProduct,
      chosenSize: selectedSize,
      quantity: 1
    };

    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.id === itemToAdd.id && item.chosenSize === itemToAdd.chosenSize);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        return copy;
      }
      return [itemToAdd, ...prev];
    });

    if (onAddToCart) {
      onAddToCart(itemToAdd);
    }

    if (openDrawer) {
      setIsCartOpen(true);
    } else {
      setCartSuccess(true);
      setTimeout(() => setCartSuccess(false), 2000);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart(true);
  };

  // Helper para fotos del producto seleccionado
  const productPhotos = selectedProduct 
    ? (selectedProduct.images && selectedProduct.images.length > 0 
        ? selectedProduct.images 
        : [selectedProduct.image, selectedProduct.image, selectedProduct.image, selectedProduct.image].filter(Boolean))
    : [];

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    if (productPhotos.length === 0) return;
    setActivePhotoIdx((prev) => (prev + 1) % productPhotos.length);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    if (productPhotos.length === 0) return;
    setActivePhotoIdx((prev) => (prev - 1 + productPhotos.length) % productPhotos.length);
  };

  // Cálculos del Carrito
  const subtotalCart = cartItems.reduce((acc, item) => acc + (item.memberPrice * (item.quantity || 1)), 0);
  const freeShippingThreshold = 159000;
  const isDeliveryOverFreeThreshold = subtotalCart >= freeShippingThreshold;
  const deliveryCost = isDeliveryOverFreeThreshold ? 0 : 4800;
  const shippingCost = shippingMethod === 'pickup' ? 0 : deliveryCost;
  const totalCart = subtotalCart + shippingCost;
  const subtotalWithoutTax = Math.round(subtotalCart / 1.21);
  const freeShippingProgress = Math.min(100, Math.round((subtotalCart / freeShippingThreshold) * 100));

  const handleUpdateQty = (index, delta) => {
    setCartItems(prev => {
      const copy = [...prev];
      const newQty = (copy[index].quantity || 1) + delta;
      if (newQty <= 0) {
        copy.splice(index, 1);
      } else {
        copy[index].quantity = newQty;
      }
      return copy;
    });
  };

  const handleRemoveItem = (index) => {
    setCartItems(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleStartPurchase = () => {
    if (cartItems.length === 0) return;

    // Generar registro en velez_orders
    const newOrder = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('es-AR'),
      items: [...cartItems],
      total: totalCart,
      shippingMethod,
      status: 'Abonado - Listo para retirar en Tienda Oficial',
      pickupLocation: 'Sede Central: Av. Juan B. Justo 9200 (Liniers)'
    };

    try {
      const prevOrders = JSON.parse(localStorage.getItem('velez_orders') || '[]');
      localStorage.setItem('velez_orders', JSON.stringify([newOrder, ...prevOrders]));
    } catch (e) {
      console.error("Error guardando en velez_orders:", e);
    }

    const itemsSummary = cartItems.map(i => i.name).join(', ');

    // Limpiar carrito
    setCartItems([]);

    if (onOpenPay) {
      onOpenPay(
        totalCart, 
        `Tienda Oficial CAVS: ${itemsSummary} (${shippingMethod === 'pickup' ? 'Retiro en Sede' : 'Envío a Domicilio'})`
      );
    } else if (showToast) {
      showToast(`¡Compra de $${totalCart.toLocaleString('es-AR')} abonada con éxito!`);
    }
    setIsCartOpen(false);
  };

  // ==============================================================
  // VISTA DEDICADA A PANTALLA COMPLETA: DETALLE DEL PRODUCTO
  // ==============================================================
  if (selectedProduct) {
    return (
      <div className="space-y-4 animate-fadeIn font-sans pb-36">
        {/* Top bar de navegación */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleCloseDetail}
            className="h-10 px-2 -ml-2 rounded-xl text-slate-600 hover:text-[#0055A4] hover:bg-slate-100 flex items-center gap-1.5 text-xs font-bold transition-colors active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>Volver a la Tienda</span>
          </button>
          
          <button
            onClick={() => setIsCartOpen(true)}
            className="h-9 px-3 rounded-full bg-blue-50 border border-blue-200 text-[#0055A4] font-bold text-xs flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <ShoppingBag className="w-4 h-4 shrink-0 text-[#0055A4]" />
            <span>Carrito ({cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)})</span>
          </button>
        </div>

        {/* SLIDER DE 4 FOTOS A PANTALLA COMPLETA */}
        <div className="relative aspect-square sm:aspect-video rounded-3xl bg-slate-900 overflow-hidden shadow-lg select-none group border border-slate-200">
          <div 
            className="flex h-full transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${activePhotoIdx * 100}%)` }}
          >
            {productPhotos.map((imgSrc, idx) => (
              <div key={idx} className="w-full h-full shrink-0 relative flex items-center justify-center bg-slate-100">
                <img 
                  src={imgSrc} 
                  alt={`${selectedProduct.name} - Vista ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Flechas de deslizamiento lateral */}
          {productPhotos.length > 1 && (
            <>
              <button
                onClick={handlePrevPhoto}
                className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 z-20 active:scale-95 transition-all shadow-md"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-5 h-5 shrink-0" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 z-20 active:scale-95 transition-all shadow-md"
                aria-label="Siguiente foto"
              >
                <ChevronRight className="w-5 h-5 shrink-0" />
              </button>
            </>
          )}

          {/* Tag Institucional */}
          <span className="absolute bottom-3 left-3 bg-[#001D4A] text-white text-[10px] font-black px-3 py-1 rounded-xl shadow-md z-10">
            {selectedProduct.brand} • {selectedProduct.tag}
          </span>

          {/* Indicadores de Dots (1 a 4) */}
          {productPhotos.length > 1 && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-10 bg-slate-950/60 px-3 py-1.5 rounded-full backdrop-blur-xs">
              {productPhotos.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActivePhotoIdx(dotIdx)}
                  className={`h-2 rounded-full transition-all ${
                    activePhotoIdx === dotIdx 
                      ? 'w-5 bg-white' 
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Ir a foto ${dotIdx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* INFORMACIÓN DEL PRODUCTO */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              {selectedProduct.category} • Producto Oficial
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight mt-0.5">
              {selectedProduct.name}
            </h1>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>

          {/* Comparativa de Precios */}
          <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-2xl flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-400 line-through block font-medium">
                Precio Regular: ${selectedProduct.price.toLocaleString('es-AR')}
              </span>
              <div className="text-2xl font-black text-[#001D4A] font-mono mt-0.5">
                ${selectedProduct.memberPrice.toLocaleString('es-AR')}
              </div>
            </div>
            <span className="text-xs font-black bg-[#0A7E43] text-white px-3 py-1 rounded-full shadow-sm">
              10% OFF Socia
            </span>
          </div>

          {/* Selector de Talles */}
          <div>
            <label className="text-xs font-black text-slate-800 block mb-2 uppercase tracking-wider">
              Seleccioná tu Talle:
            </label>
            <div className="flex gap-2">
              {selectedProduct.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`flex-1 h-11 min-h-[44px] rounded-xl text-xs font-bold border transition-all active:scale-[0.98] ${
                    selectedSize === s
                      ? 'bg-[#0055A4] border-[#0055A4] text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* STICKY FOOTER EN LA BASE (CON BOTÓN DE COMPRAR Y AGREGAR) */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md md:max-w-xl lg:max-w-2xl mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl flex items-center justify-between z-50">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Total Socia:</span>
            <span className="text-2xl font-black text-[#001D4A] font-mono">
              ${selectedProduct.memberPrice.toLocaleString('es-AR')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAddToCart(true)}
              className="h-12 min-h-[48px] px-4 rounded-xl bg-white hover:bg-slate-50 text-[#0055A4] border border-[#0055A4]/40 font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] leading-none whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4 shrink-0 text-[#0055A4]" />
              <span>Agregar</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="h-12 min-h-[48px] px-5 rounded-xl bg-[#0055A4] hover:bg-[#004080] text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm leading-none whitespace-nowrap shrink-0"
            >
              <span>Comprar ahora</span>
              <ArrowRight className="w-4 h-4 shrink-0 text-white" />
            </button>
          </div>
        </div>

        {/* MODAL / DRAWER OFICIAL: CARRITO DE COMPRAS */}
        {renderCartModal()}
      </div>
    );
  }

  // ==============================================================
  // CATALOGO PRINCIPAL DE PRODUCTOS
  // ==============================================================
  return (
    <div className="space-y-4 animate-fadeIn font-sans pb-6">
      
      {/* Tienda Oficial Vélez Official Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#001D4A] via-[#091D36] to-[#0055A4] text-white p-5 shadow-lg relative overflow-hidden">
        <div className="pointer-events-none absolute -right-6 -bottom-6 w-36 h-36 opacity-10 text-white">
          <svg viewBox="0 0 100 65" fill="none" className="w-full h-full">
            <path d="M0 0 L50 60 L100 0 L82 0 L50 38 L18 0 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white px-2.5 py-0.5 rounded-full">
                Tienda Oficial Vélez
              </span>
              <span className="text-[10px] text-sky-200">tiendavelez.com.ar</span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-white">Indumentaria CAVS 2026</h2>
            <p className="text-xs text-blue-100 mt-1 max-w-[260px] leading-relaxed">
              La V azulada oficial con 10% de descuento automático para socias al día.
            </p>
            <div className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-bold bg-white text-[#001D4A] px-3 py-1 rounded-full shadow-sm">
              <Tag className="w-3.5 h-3.5 shrink-0" />
              <span>10% OFF Exclusivo con Carnet de Socia</span>
            </div>
          </div>

          {/* Botón Carrito Flotante en Banner */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="h-11 px-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center gap-2 active:scale-95 transition-all shrink-0"
          >
            <ShoppingBag className="w-4 h-4 shrink-0 text-white" />
            <span className="hidden sm:inline">Carrito</span>
            <span className="bg-[#0055A4] text-white text-[10px] px-2 py-0.5 rounded-full font-black border border-white/30">
              {cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)}
            </span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
        {SHOP_CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`h-9 px-3.5 rounded-xl text-xs font-bold transition-all shrink-0 select-none flex items-center active:scale-[0.98] ${
              selectedCategory === c
                ? 'bg-[#0055A4] text-white shadow-md shadow-blue-900/20 scale-[1.02]'
                : 'bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredProducts.map((p) => {
          return (
            <div 
              key={p.id}
              onClick={() => handleOpenDetail(p)}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md hover:border-[#0055A4] transition-all flex flex-col justify-between cursor-pointer group active:scale-[0.98]"
            >
              <div className="relative aspect-square bg-slate-100 overflow-hidden flex items-center justify-center">
                {p.image ? (
                  <img 
                    src={p.image} 
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-4">
                    <Shirt className="w-10 h-10 stroke-[1.5] text-slate-300 group-hover:text-[#0055A4] transition-colors" />
                    <span className="text-[10px] font-bold text-slate-400 mt-2 tracking-wide uppercase text-center">
                      Imagen próximamente
                    </span>
                  </div>
                )}
                <span className="absolute top-2 left-2 bg-[#001D4A] text-white text-[9px] font-bold px-2 py-0.5 rounded-md shadow">
                  {p.tag}
                </span>
                <span className="absolute bottom-2 right-2 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                  10% OFF
                </span>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                    {p.brand}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#0055A4] transition-colors line-clamp-2 mt-0.5 leading-snug">
                    {p.name}
                  </h4>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100">
                  <div className="text-[10px] text-slate-400 line-through">
                    ${p.price.toLocaleString('es-AR')}
                  </div>
                  <div className="text-base font-black text-[#001D4A]">
                    ${p.memberPrice.toLocaleString('es-AR')}
                  </div>
                  <span className="text-[10px] font-bold text-[#0A7E43] block">
                    Precio Socia Activa
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const itemToAdd = {
                        ...p,
                        chosenSize: p.sizes?.[0] || 'M',
                        quantity: 1
                      };
                      setCartItems(prev => {
                        const existingIdx = prev.findIndex(item => item.id === itemToAdd.id && item.chosenSize === itemToAdd.chosenSize);
                        if (existingIdx >= 0) {
                          const copy = [...prev];
                          copy[existingIdx].quantity += 1;
                          return copy;
                        }
                        return [itemToAdd, ...prev];
                      });
                      if (showToast) {
                        showToast(`¡Agregaste "${p.name}" al carrito!`);
                      }
                      setIsCartOpen(true);
                    }}
                    className="mt-2.5 w-full h-10 rounded-xl text-xs font-bold transition-all inline-flex items-center justify-center gap-1.5 bg-[#0055A4] hover:bg-[#004080] text-white leading-none active:scale-[0.98] shadow-xs whitespace-nowrap"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 shrink-0 text-white" />
                    <span>Agregar</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL / DRAWER OFICIAL: CARRITO DE COMPRAS */}
      {renderCartModal()}

    </div>
  );

  // ==============================================================
  // COMPONENTE: CARRITO DE COMPRAS OFICIAL TIENDA VÉLEZ
  // ==============================================================
  function renderCartModal() {
    if (!isCartOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center animate-fadeIn">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />

        {/* Cart Container con scroll ergonómico desacoplado */}
        <div className="relative w-full max-w-md md:max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col h-full max-h-[90vh] z-10 overflow-hidden font-sans">
          
          {/* 1. Header Fijo Superior */}
          <div className="p-4 border-b border-blue-900 bg-[#0055A4] text-white flex items-center justify-between shrink-0">
            <h3 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-sky-200" />
              <span>Carrito de Compras ({cartItems.length})</span>
            </h3>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/20 active:scale-95 transition-all"
              aria-label="Cerrar carrito"
            >
              <X className="w-4 h-4 shrink-0 text-white" />
            </button>
          </div>

          {/* 2. Cuerpo Central con Scroll Nativo Fluido */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3">
            
            {cartItems.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="text-sm font-bold text-slate-700">Tu carrito está vacío</h4>
                <p className="text-xs text-slate-400">Elegí productos oficiales de Vélez y sumalos a tu compra.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 text-xs font-bold text-[#0055A4] underline"
                >
                  Ver productos de la tienda
                </button>
              </div>
            ) : (
              <>
                {/* Lista de Productos en el Carrito */}
                <div className="divide-y divide-slate-100">
                  {cartItems.map((item, idx) => (
                    <div key={`${item.id}_${item.chosenSize}_${idx}`} className="py-3 flex items-center justify-between gap-3">
                      {/* Thumbnail */}
                      <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info & Quantity */}
                      <div className="flex-1 min-w-0 pr-1">
                        <h4 className="text-xs font-bold text-slate-900 leading-snug truncate">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-slate-500 font-medium block">
                          Talle: {item.chosenSize} • Blanco y Azul
                        </span>

                        {/* Quantity Counter Pill */}
                        <div className="mt-2 inline-flex items-center border border-slate-300 rounded-lg overflow-hidden h-8">
                          <button
                            onClick={() => handleUpdateQty(idx, -1)}
                            className="w-8 h-full flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold active:bg-slate-200 text-sm"
                            aria-label="Restar una unidad"
                          >
                            —
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-slate-800">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => handleUpdateQty(idx, 1)}
                            className="w-8 h-full flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold active:bg-slate-200 text-sm"
                            aria-label="Sumar una unidad"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Price & Delete */}
                      <div className="flex flex-col items-end justify-between h-16 shrink-0">
                        <button
                          onClick={() => handleRemoveItem(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                          aria-label="Eliminar producto del carrito"
                        >
                          <Trash2 className="w-4 h-4 shrink-0" />
                        </button>
                        <div className="text-sm font-extrabold text-slate-900 font-mono">
                          ${((item.memberPrice) * (item.quantity || 1)).toLocaleString('es-AR')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Barra de Progreso Envío Gratis (Superando $159.000) */}
                <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-rose-600">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4 shrink-0" />
                      <span>Envío gratis superando los $159.000</span>
                    </span>
                    <span className="text-[11px] font-mono">{freeShippingProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div 
                      className="h-full bg-rose-500 rounded-full transition-all duration-500"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Medios de Envío */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <Truck className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>Medios de envío</span>
                  </div>

                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="Tu código postal"
                      className="flex-1 h-11 px-3 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0055A4]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsCalculatingShipping(true);
                        setTimeout(() => setIsCalculatingShipping(false), 500);
                      }}
                      className="h-11 px-4 rounded-xl border-2 border-[#0055A4] text-[#0055A4] font-black text-xs hover:bg-blue-50 active:scale-95 transition-all"
                    >
                      {isCalculatingShipping ? '...' : 'CALCULAR'}
                    </button>
                  </div>

                  {/* Opciones de Entrega */}
                  <div className="space-y-2 pt-1">
                    {/* Opción 1: Retiro en Tienda Oficial (GRATIS) */}
                    <label 
                      onClick={() => setShippingMethod('pickup')}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                        shippingMethod === 'pickup'
                          ? 'border-[#0055A4] bg-blue-50/70 ring-1 ring-[#0055A4]'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input 
                          type="radio" 
                          name="shipping" 
                          checked={shippingMethod === 'pickup'} 
                          onChange={() => setShippingMethod('pickup')}
                          className="accent-[#0055A4]"
                        />
                        <div>
                          <strong className="text-slate-900 block">Retiro en Tienda Oficial Vélez</strong>
                          <span className="text-[11px] text-slate-500">Sede Central: Av. Juan B. Justo 9200 (Listo en 24 hs)</span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-[#0A7E43] uppercase">¡Gratis!</span>
                    </label>

                    {/* Opción 2: Envío a Domicilio */}
                    <label 
                      onClick={() => setShippingMethod('delivery')}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                        shippingMethod === 'delivery'
                          ? 'border-[#0055A4] bg-blue-50/70 ring-1 ring-[#0055A4]'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input 
                          type="radio" 
                          name="shipping" 
                          checked={shippingMethod === 'delivery'} 
                          onChange={() => setShippingMethod('delivery')}
                          className="accent-[#0055A4]"
                        />
                        <div>
                          <strong className="text-slate-900 block">Envío a Domicilio (Correo Argentino / Andreani)</strong>
                          <span className="text-[11px] text-slate-500">Llega en 48 a 72 hs hábiles</span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-slate-900 font-mono">
                        {isDeliveryOverFreeThreshold ? <span className="text-[#0A7E43]">¡Gratis!</span> : '$4.800'}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Datos de Socia Precargados */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[#001D4A] uppercase text-[10px] tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0055A4]" />
                      <span>Datos de Socia CAVS Precargados</span>
                    </span>
                    <span className="text-[10px] font-bold text-[#0A7E43] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      10% OFF Aplicado
                    </span>
                  </div>
                  <div className="text-slate-800 font-bold">
                    {user?.nombre || "Martina Greco"} • <span className="text-slate-500 font-normal">Socia Nº {user?.nroSocio || "45.965"}</span>
                  </div>
                  <div className="text-slate-600 text-[11px]">
                    DNI: {user?.dni || "42.498.635"} • Tel: +54 11 4596-2210
                  </div>
                  <div className="text-slate-600 text-[11px] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Av. Juan B. Justo 8840, Liniers, CABA (CP 1408)</span>
                  </div>
                </div>
              </>
            )}

          </div>

          {/* 3. Footer Fijo con Total y Botón de Pago */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-slate-200 shrink-0 bg-white shadow-lg space-y-2">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-xs text-slate-500 block">Total a Pagar (con 10% OFF Socia):</span>
                  <span className="text-xs text-slate-400 font-medium">
                    {shippingMethod === 'pickup' ? 'Retiro en Sede sin cargo' : isDeliveryOverFreeThreshold ? 'Envío gratis bonificado' : 'Incluye $4.800 de envío'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#0055A4] font-mono">
                    ${totalCart.toLocaleString('es-AR')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleStartPurchase}
                className="w-full h-12 bg-[#0055A4] hover:bg-[#004080] text-white font-bold text-sm rounded-xl inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm leading-none"
              >
                <span>Confirmar Pago de Camiseta (${totalCart.toLocaleString('es-AR')})</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <div className="text-center pt-0.5">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Continuar explorando tienda
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }
}
