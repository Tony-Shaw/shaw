function  fn() {
    try{
        // console.log(aaaa);
        // throw "抛出一个异常"
    }
    catch (err){
        // 当try内的语句存在异常，会执行catch.
        console.log(11111,err);
    }
    finally {
        console.log("不管try当中有没有异常，我都会执行")
    }

}
fn();