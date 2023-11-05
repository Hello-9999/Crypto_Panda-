// export default paypalButtonIOnt = () => {
//   paypal.Buttons({
//     createOrder() {
//       return fetch("/my-server/create-paypal-order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           cart: [
//             {
//               sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
//               quantity: "YOUR_PRODUCT_QUANTITY",
//             },
//           ],
//         }),
//       })
//         .then((response) => response.json())
//         .then((order) => order.id);
//     },
//   });
// };

export const PaypalToken = async () => {
  

  console.log(auth, "auth");
  try {
    const response = await axios.post(
      `${paypalServer}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application / x - www - form - urlencoded",
          // bad_client_id: `${PAYPAL_CLIENT_SECRET}`,
          Authorization: `Basic ${btoa(
            `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
          )}`,
        },
      }
    );
    // console.log(response.data, "id");
    return response;
  } catch (error) {
    console.log(error, "id");
  }
};
