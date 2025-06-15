class ValidationHelper{
    static Islater(value){
        let OnlyLaterRegx=/^[A-Za-z\'\s\.\,\-\!\@\#\%\$\^\&\*\(\)\[\]\{\}\:\;\"\<\>\?\/\+\_\=\\\|`\~']+$/
        return OnlyLaterRegx.test(value)
    }
    static IsEmail(value){
        let EmailRegx=/\S+@gmail+\.\S+/;
        return EmailRegx.test(value);
    }
    static IsMobile(value){
        let MobileRegx= /^(\+8801[3-9]\d{8}|01[3-9]\d{8})$/;
        return MobileRegx.test(value);
    }
    static IsNumber(value){
        let OnlyNumberRegx=/^\d+$/;
        return OnlyNumberRegx.test(value);
    }
    static IsNull(value){
        return value==null
    }
    static IsEmpty(value){
        return value.length===0;
    }
}
export default ValidationHelper;