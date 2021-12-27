    const icons = {
          success:'fa-check-circle',
          info : 'fa-info-circle',
          warning : 'fa-exclamation-triangle',
          error : 'fa-exclamation-triangle'
    };
    function toast({title = '',
                   message = '',
                  type = 'info',
                  duration = 3000}){
        
      const main = document.getElementById("toast");
      if(main){
        const toast = document.createElement('div');

        const t = setTimeout(() => {
          main.removeChild(toast);
        },duration+1000);

         toast.onclick = (e)=>{
          if(e.target.closest(".toast__close")){
            console.log("close")
            main.removeChild(toast);
            clearTimeout(t);
          }
        }

        const delay = (duration / 1000).toFixed(2);

        toast.classList.add('toast', `toast--${type}`);
        toast.style.animation = `slideinleft ease .3s,fadeout linear 1s ${delay}s forwards`;
        toast.innerHTML=`
                  <div class="toast__icon">
                    <i class="fas ${icons[type]}"></i>
                  </div>
                  <div class="toast__body">
                    <h3 class="toast__title">${title}</h3>
                    <p class="toast__msg">${message}</p>
                  </div>
                  <div class="toast__close">
                    <i class="fas fa-window-close"></i>
                  </div>
        `;
        main.appendChild(toast);
        
      }
      
    }
    function showSuccessToast() {
      toast({
        title: 'Thành công!',
        message: 'Bạn đã đăng ký thành công tài khoản',
        type: 'success',
        duration: 3000
      });
    }

    function showErrorToast() {
      toast({
        title: "Thất bại!",
        message: "Có lỗi xảy ra, vui lòng liên hệ quản trị viên.",
        type: "error",
        duration: 3000
      });
    }