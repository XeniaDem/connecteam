import { ICreatePayment, YooCheckout } from '@a2seven/yoo-checkout'; // OR const { YooCheckout } = require('@a2seven/yoo-checkout');

const checkout = new YooCheckout({ shopId: '379644', secretKey: 'test_fWTAbill9dI61mU1fbAPbRtb-jNc5Haq0t8z-1JvlWk' });



// const payment = await yooKassa.createPayment({
//     amount: {
//       value: "0.00",
//       currency: "RUB"
//     },
//     payment_method_data: {
//         type: "bank_card"
//     },
//     confirmation: {
//       type: "redirect",
//       return_url: "http://localhost:5173/user_page"
//     },
//     description: "Оплата тарифа"
// });
const handlePayment = async () => {
    const createPayload: ICreatePayment = {
        amount: {
            value: '0.00',
            currency: 'RUB'
        },
        payment_method_data: {
            type: 'bank_card'
        },
        confirmation: {
            type: 'redirect',
            return_url: 'http://localhost:5173/user_page'
        }
    };

    try {
        const payment = await checkout.createPayment(createPayload);
        console.log(payment)
    } catch (error) {
        console.error(error);
    }

}

export {handlePayment}