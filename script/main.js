let cart = JSON.parse(localStorage.getItem('cart'))

let add_cart_times = 1, cslide = document.querySelector(".bottom-left").children[2].children[0], dslide = document.querySelector(".dlg").children[2].children[0];

let cctb =  document.querySelectorAll(".images")[1].children[0].children[0].src;

if (cart == null) {
    cart = {}
}

document.querySelector("#crt_bt").addEventListener("click", function () {
    tgl_hover();
    load_cart();

});
document.querySelector("#crt_btm").addEventListener("click", function () {
    tgl_hover();
    load_cart();

});

document.addEventListener("click", function (e) {
    if (document.querySelector(".cart-tab").classList.contains("vism") == true && document.querySelector(".cart-c").contains(e.target) == false) {

        tgl_hover();
    }
});


function tgl_hover() {

    document.querySelector(".cart-tab").classList.toggle("vism");

}

function load_cart() {
    let c = 0;
    if (Object.keys(cart).length != 0) {

        document.querySelector(".cart-emp").style.display = "none";
        document.querySelector(".crts").innerHTML = "";
        for (const [k, v] of Object.entries(cart)) {


            let html = `<section class="crt">
            <section class="crt-pim">
            <img src="`+ v.tmb + `">
            </section>
            <section class="crt-info">
              <h4>`+ k + `</h4>
              <section class="crt-qnt">
                <span>`+ v.unit + `</span>
                <span>x</span>
                <span>`+ v.times + `</span>
                <span>`+ v.total + `</span>
              </section>
            </section>
            <section class="crt-rm">
              <img onclick="remove_item('`+ k + `')" src="./images/icon-delete.svg">
              </section>
          </section>`
            document.querySelector(".crts").insertAdjacentHTML("beforeend", html);
            c+=v.times

        }
        
        document.querySelector(".cart-cc").style.display = "flex";

    } else {
        document.querySelector(".cart-emp").style.display = "flex";
        document.querySelector(".cart-cc").style.display = "none";
    }
    if(c!=0){
        document.querySelector(".cart-count").style.display = "flex";
        document.querySelector(".cart-count").innerHTML = c;

    }else{
        document.querySelector(".cart-count").style.display = "none";

    }
}

function reduce_item() {
    if (add_cart_times != 1) {
        add_cart_times--;
        document.querySelector(".quant").innerHTML = add_cart_times;
    }
}

function add_item() {
    if (add_cart_times != 100) {
        add_cart_times++;
        document.querySelector(".quant").innerHTML = add_cart_times;
    }
}

function add_to_cart() {
    let name = document.querySelector(".item-name").innerHTML.replaceAll('\n', '').replaceAll('  ', '');
    let unit = document.querySelector(".item-unit").innerHTML;
    let tmb = document.querySelectorAll(".item-tmb")[1].src;
    let total = '$' + (parseInt(unit.replace('$', '')) * add_cart_times) + '.00';
    cart[name] = { unit: unit, times: add_cart_times, tmb: tmb, total: total };
    localStorage.setItem('cart', JSON.stringify(cart));
    load_cart();
}

function remove_item(id) {
    delete cart[id];
    localStorage.setItem('cart', JSON.stringify(cart));
    load_cart();
}

function set_tmb(elem,dlg) {
    let src = elem.children[0].src
    if (!dlg) {
        cslide.classList.toggle("img-a")
        document.querySelectorAll(".item-tmb")[1].src = src
        cslide=elem
    }else{
        dslide.classList.toggle("img-a")
        document.querySelectorAll(".item-tmb")[0].src = src
        dslide=elem
    }
    elem.classList.toggle("img-a")
}

function tgl_prev(){
    document.querySelector(".dlg").classList.toggle("vism")
}

function tgl_menu(){
    document.querySelector(".mb-menuc").classList.toggle("vism")
}

function prev_img(){
    let isrc = document.querySelectorAll(".images")[1].children

    for (let i = 0; i < isrc.length; i++) {
        if(isrc[i].classList.contains("img-a")){
            if(i==0){
                set_tmb(isrc[isrc.length-1],false)
            }else{
                set_tmb(isrc[i-1],false)
            }
            break
        }
    }
}

function next_img(){
    let isrc = document.querySelectorAll(".images")[1].children

    for (let i = 0; i < isrc.length; i++) {
        if(isrc[i].classList.contains("img-a")){
            if(i==isrc.length-1){
                set_tmb(isrc[0],false)
            }else{
                set_tmb(isrc[i+1],false)
            }
            break
        }
    }
}

load_cart()