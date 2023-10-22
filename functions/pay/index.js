module.exports.payRequest = (request, response, stripeClient) => {
    response.send("this is my payment gateway");
    const body = JSON.parse(request.body);
    // console.log(body.token, body.amount, body.name);
    // response.send("success");

    const { token, amount } = body;
    stripeClient.paymentIntents
        .create({
            amount,
            currency: "USD",
            payment_method_types: ["card"],
            payment_method_data: {
                type: "card",
                card: {
                    token,
                },
            },
            confirm: true,
        })
        .then((paymentIntent) => {
            response.json(paymentIntent);
        })
        .catch((e) => {
            console.log(e);
            response.status(400);
            response.send(e);
        });
};
