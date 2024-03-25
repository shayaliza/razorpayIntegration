import React from "react";

function Payment() {
  const keyID = "rzp_test_El6TVaCcp8aTF7";
  const checkoutHandler = async (amount) => {
    fetch("http://localhost:5000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    })
      .then((response) => response.json())
      .then((data) => {
        const order = data.order;

        const options = {
          key: keyID,
          amount,
          currency: "INR",
          name: "Shayaliza",
          description: "Shayaliza Razorpay Integration",
          image: "your Profile URL",
          order_id: order.id,
          callback_url: "http://localhost:5000/api/paymentverification",
          prefill: {
            name: "Shayaliza",
            email: "sample@gmail.com",
            contact: "77777777777",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#121212",
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      });
  };

  return (
    <>
      <div onClick={() => checkoutHandler(8000)}>buy Now Rs 8000 </div>
      <div onClick={() => checkoutHandler(6000)}>buy Now Rs 6000 </div>
      <div onClick={() => checkoutHandler(200)}>buy Now Rs 200 </div>
    </>
  );
}

export default Payment;
