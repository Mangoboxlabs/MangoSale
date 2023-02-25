<template>
<div class="mangobox-footer">
  <div class="dao-footer-part3">
    <img src="../imgs/logo.webp" alt=""/>
  </div>
  <div class="dao-footer-part2 ">

    <div class="icon-box">
      <span></span>
      <a class="icon" href="https://twitter.com/mangoboxlab" target="_blank">
        <svg t="1630482035608" class="icon" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             p-id="4479" width="48" height="48">
          <path
              d="M923.2 289.6c0 354.4-232.8 609.6-575.2 620.8-144.8 11.2-244-32.8-332.8-99.2 99.2 11.2 232.8-21.6 298.4-88.8-99.2 0-155.2-56-188-132h88.8C125.6 556.8 58.4 490.4 58.4 380c21.6 11.2 44 21.6 88.8 21.6-77.6-44-121.6-188-66.4-276.8 99.2 110.4 220.8 210.4 421.6 220.8-56-220.8 232.8-332.8 354.4-188 56-11.2 88.8-32.8 132-56-11.2 56-44 88.8-88.8 110.4 44 0 77.6-11.2 110.4-32.8-10.4 44-54.4 88.8-87.2 110.4z"
              fill="#1296db" p-id="4480"></path>
        </svg>
      </a>
    </div>


    <div class="icon-box">
      <span></span>
      <a class="icon" href="https://github.com/Mangoboxlabs" target="_blank">
        <svg t="1630482394010" class="icon" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="16649" width="48" height="48">
          <path
              d="M905.55 174.86q26.29-60.57 12.01-115.43Q903.27 4.57 898.69 0q-80 4.57-129.14 34.86-49.14 30.28-50.28 34.85-37.72-16-102.86-20t-72-4q-6.86 0-72 4t-102.86 20q-1.14-4.57-50.29-34.85Q270.12 4.57 190.12 0q-4.57 4.57-18.86 59.43-14.28 54.86 13.15 115.43-6.86 0-42.29 66.85t-16 206.28q29.72 129.14 117.14 176.57 87.43 47.43 167.43 44-2.28 1.14-19.43 25.14-17.14 24-16 68.58-1.15 2.28-36 14.28t-79.43-2.86q-43.43-20.57-65.71-49.71-22.28-29.14-22.28-31.43-1.15-5.71-36-34.28-34.86-28.58-79.43-12.58-3.43 0-1.14 12.58 2.28 12.57 46.86 34.28l26.29 40q22.86 36.57 38.28 69.71 15.43 33.14 73.14 50.86 57.72 17.72 129.72 1.72v133.71q1.14 1.14-2.29 6.85-3.43 5.72-20.57 10.86t-18.86 10.86q-1.72 5.72 7.43 6.86h418.28q9.14-1.14 7.43-6.86-1.71-5.72-18.86-10.86-17.14-5.14-20.58-10.86-3.43-5.71-2.28-6.85V762.28q-3.43-44.58-21.14-68.58-17.72-24-20-25.14 80 3.43 167.43-44t117.14-176.57q19.43-139.43-15.43-206.28t-41.72-66.85z"
              p-id="16650" fill="#1296db"></path>
        </svg>
      </a>
    </div>

  </div>
</div>
</template>

<script>
export default {
  name: "mangobox-footer"
}
</script>

<style lang="scss" scoped>
.mangobox-footer{
  $blehness: 50%;
  display: flex;
  width: 1200px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #aaa;
  @keyframes pulse_hue {
    0% {
      filter: hue-rotate(0deg) grayscale($blehness);
    }
    100% {
      filter: hue-rotate(360deg) grayscale($blehness);
    }
  }
  box-sizing: border-box;
  padding: 10px 0;



  .dao-footer-part2 {
    width: 100px;
    display: flex;
    justify-content: space-between;

    .icon-box {
      cursor: pointer;
      width: 30px;
      height: 30px;
      background: rgba(255, 255, 255, 0.12);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      padding: 10px;
      background: #eee;
      .icon path {
        fill: #555 !important;
      }

      &:hover .icon path {
        fill: #111 !important;
      }

      span {
        width: 0%;
        transition: 0.3s;
        height: 0%;
        border-radius: 50%;
        position: absolute;
        margin: 3px;
        background: white;
      }

      &:hover span {
        width: 100%;
        height: 100%;
        margin: 0px;
      }

      .icon {
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;
        width: 18px;
        height: 18px;
        position: relative;
      }

    }
  }

  .dao-footer-part3 {
    text-align: center;
    img{
      width: 10em;

    }
  }

  @keyframes twinkleWhite {
    0% {
      box-shadow: 0 0 0 #eee;
    }
    50% {
      box-shadow: 0px 0px 50px #eee;
    }
    100% {
      box-shadow: 0 0 0 #eee;
    }
  }

}
</style>
