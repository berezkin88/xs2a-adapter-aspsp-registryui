window.onload = async () => {
    window.COUNTUP = new CountUp("total", await getTotal());
    
    COUNTUP.start();
}

let getTotal = async () => {

    let result = await fetch(BASE + "/count");
    result = await result.text();
    return result;
}