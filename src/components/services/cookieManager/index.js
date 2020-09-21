let CookieManager = {
    setCookie: (name, value, seconds) => {
        // value = simpleCrypto.encrypt(value);
        var expires = '';
        if (seconds) {
            var date = new Date();
            date.setTime(date.getTime() + (seconds*1000));
            expires = '; expires=' + date.toLocaleDateString();
        }
        document.cookie = name + '=' + (value || '')  + expires + '; path=/';
    },
    getCookie : (name) => {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) {
                let res =  c.substring(nameEQ.length,c.length);
                return res;
            };
        }
        return null;
    },
    deleteCookie: (name) => {
        document.cookie = name+'=; Max-Age=-99999999;';
    }
};
export default CookieManager


