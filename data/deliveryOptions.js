import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


const dayJs = dayjs()

const formatedDay1 = dayJs.add(7,'days').format('dddd, MMMM D');
const formatedDay2 = dayJs.add(5,'days').format('dddd, MMMM D');
const formatedDay3 = dayJs.add(3,'days').format('dddd, MMMM D');




const deliveryOptions = [{
    id : '1',
    day : formatedDay1,
    price : 0
}, 
{
    id : '2',
    day : formatedDay2,
    price : 4.99
}, 
{
    id : '3',
    day : formatedDay3,
    price : 9.99
}]


export default  deliveryOptions;