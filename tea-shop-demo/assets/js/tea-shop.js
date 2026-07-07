(()=>{
const img='assets/images/menu/';
const groups=[
['Trà sữa bán chạy',[['tra-sua-truyen-thong','Trà sữa truyền thống',35000,'tra-sua-truyen-thong.jpg'],['tra-sua-tran-chau','Trà sữa trân châu đường đen',45000,'tra-sua-tran-chau-duong-den.jpg'],['tra-sua-matcha','Trà sữa matcha',47000,'tra-sua-matcha.jpg']]],
['Trà trái cây',[
['tra-dao-cam-sa','Trà đào cam sả',49000,'tra-dao-cam-sa.jpg'],
['tra-vai-hoa-hong','Trà vải hoa hồng',47000,'tra-vai-hoa-hong.jpg'],
['tra-xoai-nhiet-doi','Trà xoài nhiệt đới',49000,'tra-xoai-nhiet-doi.jpg'],
['tra-chanh-day-mat-ong','Trà chanh dây mật ong',45000,'tra-chanh-day-mat-ong.jpg'],
['tra-dau-tuoi','Trà dâu tươi',48000,'tra-dau-tuoi.jpg'],
['tra-luu-berry','Trà lựu berry',49000,'tra-luu-berry.jpg'],
['tra-vai-chanh','Trà vải chanh',47000,'tra-vai-chanh.jpg'],
['tra-tao-xanh','Trà táo xanh',45000,'tra-tao-xanh.jpg'],
['tra-dua-nha-dam','Trà dứa nha đam',48000,'tra-dua-nha-dam.jpg'],
['tra-cam-nhiet-doi','Trà cam nhiệt đới',49000,'tra-cam-nhiet-doi.jpg']]],['Kem cheese & đặc biệt',[
['socola-kem-cheese','Socola kem cheese',49000,'socola-kem-cheese.jpg'],
['tra-sua-oreo-kem-cheese','Trà sữa Oreo kem cheese',49000,'tra-sua-oreo-kem-cheese.jpg'],
['tra-sua-matcha-kem-cheese','Trà sữa matcha kem cheese',47000,'tra-sua-matcha-kem-cheese.jpg'],
['tra-sua-khoai-mon-kem-cheese','Trà sữa khoai môn kem cheese',47000,'tra-sua-khoai-mon-kem-cheese.jpg'],
['hong-tra-kem-cheese','Hồng trà kem cheese',45000,'hong-tra-kem-cheese.jpg'],
['tra-dao-kem-cheese','Trà đào kem cheese',49000,'tra-dao-kem-cheese.jpg'],
['tra-dau-kem-cheese','Trà dâu kem cheese',48000,'tra-dau-kem-cheese.jpg'],
['tra-xoai-kem-cheese','Trà xoài kem cheese',49000,'tra-xoai-kem-cheese.jpg'],
['tra-sua-pudding-trung','Trà sữa pudding trứng',46000,'tra-sua-pudding-trung.jpg'],
['tra-sua-caramel-kem-cheese','Trà sữa caramel kem cheese',49000,'tra-sua-caramel-kem-cheese.jpg']]],
['Combo & ưu đãi',[
['combo-doi-truyen-thong','Combo đôi truyền thống',80000,'01-combo-doi-truyen-thong.png'],
['combo-doi-trai-cay','Combo đôi trái cây',90000,'02-combo-doi-trai-cay.png'],
['combo-kem-cheese','Combo kem cheese',95000,'03-combo-kem-cheese.png'],
['combo-ban-than','Combo bạn thân',135000,'04-combo-ban-than.png'],
['combo-nhom-4-ly','Combo nhóm 4 ly',170000,'05-combo-nhom-4-ly.png']]]].map(([title,items])=>({title,items:items.map(([id,name,price,file])=>({id,name,price,image:img+file,note:'Vị trà thơm ngon.',ingredients:['Trà','Sữa','Topping','Đá']}))}));
const $=s=>document.querySelector(s);let cart=[],current=null,qty=1;
const money=n=>n.toLocaleString('vi-VN')+'đ';
function render(){ $('#menuSections').innerHTML=groups.map(g=>`<section class="menu-group"><div class="menu-group-head"><div><h2>${g.title}</h2><p>Vuốt để xem món</p></div><span>${g.items.length} món</span></div><div class="carousel">${g.items.map(p=>`<article class="product"><div class="product-image"><img src="${p.image}" alt="${p.name}"></div><div class="product-body"><div class="product-name">${p.name}</div><div class="product-meta"><span class="product-price">${money(p.price)}</span></div><button class="button select-product" data-id="${p.id}">Chọn món</button></div></article>`).join('')}</div></section>`).join('');
 document.querySelectorAll('.select-product').forEach(b=>b.onclick=()=>openProduct(find(b.dataset.id)));
}
function find(id){return groups.flatMap(g=>g.items).find(p=>p.id===id)}
function openProduct(p){current=p;qty=1;$('#modalProductImage').src=p.image;$('#modalProductName').textContent=p.name;$('#modalProductPrice').textContent=money(p.price);$('#modalProductNote').textContent=p.note;$('#productIngredients').innerHTML=p.ingredients.map(x=>`<span class="ingredient-chip">${x}</span>`).join('');$('#productQuantityValue').textContent=qty;$('#productModal').classList.add('open')}
function updateCart(){const old=document.querySelector('.cart-count');if(old)old.remove();if(cart.length){const b=document.createElement('i');b.className='cart-count';b.textContent=cart.reduce((a,x)=>a+x.qty,0);$('#openCart').appendChild(b)}}
document.addEventListener('click',e=>{if(e.target.id==='productQuantityMinus'){qty=Math.max(1,qty-1);$('#productQuantityValue').textContent=qty}if(e.target.id==='productQuantityPlus'){qty++;$('#productQuantityValue').textContent=qty}if(e.target.dataset.closeModal!==undefined||e.target.classList.contains('close'))document.querySelectorAll('.modal').forEach(m=>m.classList.remove('open'))});
$('#addToCart').onclick=()=>{cart.push({...current,qty});updateCart();document.querySelectorAll('.modal').forEach(m=>m.classList.remove('open'))};
$('#openCart').onclick=()=>{$('#cartList').innerHTML=cart.map(x=>`<div>${x.name} x${x.qty} - ${money(x.price*x.qty)}</div>`).join('')||'<div>Giỏ hàng trống</div>';$('#cartTotal').textContent=money(cart.reduce((a,x)=>a+x.price*x.qty,0));$('#cartModal').classList.add('open')};
$('#continueShopping').onclick=()=>document.querySelectorAll('.modal').forEach(m=>m.classList.remove('open'));
const save=$('#saveContact');if(save)save.onclick=()=>{const a=document.createElement('a');a.href='data:text/vcard,FN:Tea More';a.download='tea-more.vcf';a.click()};

// Checkout location
const locationBtn = $('#useLocation');
if(locationBtn){
 locationBtn.onclick = ()=>{
  const status=$('#checkoutStatus');
  if(!navigator.geolocation){ if(status) status.textContent='Trình duyệt không hỗ trợ lấy vị trí.'; return; }
  if(status) status.textContent='Đang lấy vị trí...';
  navigator.geolocation.getCurrentPosition(pos=>{
    const lat=pos.coords.latitude.toFixed(6);
    const lng=pos.coords.longitude.toFixed(6);
    $('#customerAddress').value=`Vị trí hiện tại: ${lat}, ${lng}`;
    if(status) status.textContent='Đã lấy vị trí thành công.';
  },()=>{
    if(status) status.textContent='Không lấy được vị trí. Hãy cho phép quyền định vị.';
  },{enableHighAccuracy:true,timeout:10000});
 };
}
const openCheckout=$('#openCheckout');
if(openCheckout){openCheckout.onclick=()=>$('#checkoutModal').classList.add('open');}

let deferredInstallPrompt = null;
const installBtn = $('#installApp');
const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
const syncInstallButton = () => {
  if (!installBtn) return;
  installBtn.hidden = isStandalone();
};
syncInstallButton();
if (installBtn) {
  installBtn.onclick = async () => {
    if (isStandalone()) return;
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      return;
    }
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    alert(isIOS ? 'Trên iPhone: bấm Chia sẻ → Thêm vào Màn hình chính.' : 'Mở menu trình duyệt và chọn Cài ứng dụng Tea More.');
  };
}
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  syncInstallButton();
});
window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  syncInstallButton();
});
const displayModeQuery = window.matchMedia('(display-mode: standalone)');
if (displayModeQuery.addEventListener) displayModeQuery.addEventListener('change', syncInstallButton);
else if (displayModeQuery.addListener) displayModeQuery.addListener(syncInstallButton);
render();updateCart();
})();
