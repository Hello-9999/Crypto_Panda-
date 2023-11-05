import axios from "axios";

const Server_key = import.meta.env.VITE_SERVER_KEY;
const Server_url = import.meta.env.VITE_SERVER_URL;
const Coin_converter = import.meta.env.VITE_BITCOIN_CONVERTER;
const CoinNEws_url = import.meta.env.VITE_COIN_NEWS;
const News_key = import.meta.env.VITE_NEWS_KEY;
const paypalServer = import.meta.env.VITE_PAYPAL_SERVER;
const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENTID;
const PAYPAL_CLIENT_SECRET = import.meta.env.VITE_PAYPAL_CLIENTSECRETKEY;
const LoginServer = import.meta.env.VITE_LOGIN_SERVER;
import Buffer from "buffer";
import { errortoast, successtoast } from "./toastify";

// import fetch from "node-fetch";

console.log(LoginServer, "server");

export const CoinListdata = async (url) => {
  console.log(`${Server_url}/v2/${url}`);
  try {
    const response = await axios.get(`${Server_url}/v2/${url}`, {
      headers: {
        "x-access-token": `${Server_key}`,
      },
    });
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const Coindetail = async (url, uid) => {
  try {
    const response = await axios.get(
      `${Server_url}/v2/coin/${url}?referenceCurrencyUuid=${uid}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
};
// axios

export const Coinpricehistory = async (id, url) => {
  try {
    const response = await axios.get(`${Server_url}/v2/coin/${id}/${url}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const marketpricehistory = async (id, url) => {
  try {
    const response = await axios.get(`${Server_url}/v2/coin/${id}/${url}`);
    return response;
  } catch (error) {
    // console.log(error);
  }
};
// console.log(BitCoin_converter)
export const BitCoinConverter = async (url, setSupport) => {
  console.log(`${BitCoin_converter}${url}`);
  try {
    const response = await axios.get(`${BitCoin_converter}${url}`);
    if (response.data.status === "success") {
      console.log("okay");
      setSupport(true);
    } else {
    }

    // console.log(response ,'erad')

    return response.data;
  } catch (error) {
    console.log(error.response.data.status);
    if (error.response.data.status === "error") {
      setSupport(false);
    } else {
      // setSupport(true)
      // setSupport(!Support)
    }
  }
};
export const CryptoConverter = async (id, Cureencyid) => {
  console.log(
    `${Coin_converter}/${id}?referenceCurrencyUuid=${Cureencyid}`,
    "response"
  );
  try {
    const response = await axios.get(
      `${Coin_converter}/${id}?referenceCurrencyUuid=${Cureencyid}`
    );
    console.log(id, "axios idd");
    console.log(Cureencyid, " axios cryptoid");
    console.log(
      `${Coin_converter}/${id}?referenceCurrencyUuid=${Cureencyid}`,
      "Converter Api"
    );

    console.log(response);

    return response;
  } catch (error) {
    console.log(id, "axios idd");
    console.log(Cureencyid, " axios cryptoid");
    console.log(
      `${Coin_converter}/${id}?referenceCurrencyUuid=${Cureencyid}`,
      "Converter Api"
    );
    console.log(error.response.data, "error converter");
  }
};

export const Priceperformance = async (id, url) => {
  try {
    const response = await axios.get(`${Server_url}/v2/coin/${id}/${url}`);
    // console.log(response,'response')
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const SearchCoin = async (value) => {
  try {
    const resposne = await axios.get(
      `${Server_url}/v2/search-suggestions?query=${value}`
    );
    return resposne;
  } catch (error) {
    console.log(error);
  }
};
export const News = async (name) => {
  console.log(name, "coinname");
  console.log(`${CoinNEws_url}/everything?q=${name}&apiKey=${News_key} check `);
  try {
    const response = await axios.get(
      `${CoinNEws_url}/everything?q=${name}&apiKey=${News_key}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getpaypalToken = async () => {
  try {
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
    ).toString("base64");
    const response = await axios.post(`${paypalServer}oauth2/token`, {
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `basic ${auth}`,
      },
    });

    console.log(response, "token");
  } catch (error) {
    console.log(error, "token");
  }
};

// export const CreateOrder = async (id, quantity) => {
//   try {
//     const response = await axios.post(
//       "https://react-paypal-js-storybook.fly.dev/api/paypal/create-order",
//       {
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           cart: [
//             {
//                 id: `${id}`,
//                 quantity: `${quantity}`,
//             },
//         ],
//         }),
//       }
//     );

//     console.log(response, "response ");

//     return response;
//   } catch (error) {
//     console.log(error, "errr");
//   }
// };

// export const OnApprove = async () => {
//   const response = await axios.post("", {
//     headers: { "Content-Type": "application/json" },
//     body:JSON.stringify({orderId:})
//   });
// };

export const LoginForm = async (data, setLoader) => {
  try {
    const response = await axios.post(`${LoginServer}/login`, data);
    // console.log(response)
    setLoader(false);
    successtoast("Login Successful ✅ ");

    return response;
  } catch (error) {
    // alert(error.response.data.error);
    errortoast(error.response.data.error);
    setLoader(false);
  }
};

export const RegisterForm = async (data, setLoader) => {
  try {
    const response = await axios.post(`${LoginServer}/register`, data);
    successtoast(response.data.message);
    setLoader(false);

    return response;
  } catch (error) {
    // alert(error)
    errortoast(error.response.data.error);
    setLoader(false);
    // <Alert severity="error">{error.response.data.error}</Alert>
  }
};

export const PaypalToken = async () => {
  const auth = btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`);

  try {
    const response = await axios.post(
      `${paypalServer}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application / x - www - form - urlencoded",
          // bad_client_id: `${PAYPAL_CLIENT_SECRET}`,
          Authorization: `Basic ${auth}`,
        },
      }
    );
    // console.log(response.data, "id");
    return response;
  } catch (error) {
    console.log(error, "id");
  }
};

export const CreateOrder = async (token, details, price) => {
  // const headers = {
  //   "Content-Type": "application/json",
  //   Authorization: `Bearer ${token}`,
  // };

  // const body = {
  //   intent: "CAPTURE",
  //   purchase_units: [
  //     {
  //       amount: {
  //         currency_code: "USD",
  //         value: "100.00",
  //       },
  //     },
  //   ],
  //   cart: [
  //     {
  //       sku: "1blwyeo8",
  //       quantity: 2,
  //     },
  //   ],

  //   // payment_source: {
  //   //   paypal: {
  //   //     experience_context: {
  //   //       payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
  //   //       payment_method_selected: "PAYPAL",
  //   //       brand_name: "EXAMPLE INC",
  //   //       locale: "en-US",
  //   //       landing_page: "LOGIN",
  //   //       shipping_preference: "SET_PROVIDED_ADDRESS",
  //   //       user_action: "PAY_NOW",
  //   //       return_url: "https://example.com/returnUrl",
  //   //       cancel_url: "https://example.com/cancelUrl",
  //   //     },
  //   //   },
  //   // },
  // };
  // try {
  //   const response = await axios.post(
  //     "https://api-m.sandbox.paypal.com/v2/checkout/orders",

  //     body,
  //     { headers }
  //   );
  //   console.log(response, "createorder");
  //   return response;
  // } catch (error) {
  //   console.log(error, "order");
  // }

  //   try

  console.log(
    "shopping cart information passed from the frontend createOrder() callback:"
    // cart
  );
  console.log(token);

  const accessToken = token;
  const url = `${paypalServer}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    order_id: 23424,
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: `${Number(price).toLocaleString(2)}`,
        },
      },
    ],
  };

  const paypalheaders = {
    // "PayPal-Request-Id": "7b92603e-77ed-4896-8e78-5dea2050476a",

    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  console.log(paypalheaders, "headers");

  // try {
  //   const response = await axios.post(
  //     url,
  //     payload,

  //     { paypalheaders }
  //   );
  //   console.log(response);
  //   return response;
  // } catch (error) {
  //   console.log(error, "createa order");
  // }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    console.log(response);
  } catch (error) {
    console.log(error, "che");
  }
};

export const onAppprove = async (token) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const body = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "100.00",
        },
      },
    ],
    cart: [
      {
        sku: "1blwyeo8",
        quantity: 2,
      },
    ],

    // payment_source: {
    //   paypal: {
    //     experience_context: {
    //       payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
    //       payment_method_selected: "PAYPAL",
    //       brand_name: "EXAMPLE INC",
    //       locale: "en-US",
    //       landing_page: "LOGIN",
    //       shipping_preference: "SET_PROVIDED_ADDRESS",
    //       user_action: "PAY_NOW",
    //       return_url: "https://example.com/returnUrl",
    //       cancel_url: "https://example.com/cancelUrl",
    //     },
    //   },
    // },
  };
  try {
    const response = await axios.post(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",

      body,
      { headers }
    );
    console.log(response, "createorder");
    return response;
  } catch (error) {
    console.log(error, "order");
  }
};
