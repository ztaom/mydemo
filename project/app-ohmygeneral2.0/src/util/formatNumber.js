export default function(n){
    if (n >= 10000 && n < 100000000){
        n = n / 10000;
        n = `${n.toFixed(1).toString().replace('.0', '')}万`;
    } else if (n >= 100000000){
        n = n / 100000000;
        n = `${n.toFixed(1).toString().replace('.0', '')}亿`;
    }
    return n;
}