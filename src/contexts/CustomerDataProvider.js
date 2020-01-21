import CustomerDataContext from "./CustomerDataContext";
import axios from "axios";

let request = {
  hostname: "5qdtfxj5j5.execute-api.us-east-1.amazonaws.com",
  method: "GET",
  url: "https://5qdtfxj5j5.execute-api.us-east-1.amazonaws.com/latest",
  path: "/latest"
};

let signedRequest = aws4.sign(request, {
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
});

delete signedRequest.headers["Host"];
delete signedRequest.headers["Content-Length"];

class CustomerDataProvider extends Component {
  state = {
    orders: null,
    validationError: "",
    name: "",
    address: "",
    zip: "",
    email: "",
    phone: "",
    orderNumber: "",
    createdAt: "",
    note_attributes: null,
    thickness: null,
    texture: null,
    hairCondition: null,
    hairGoals: null,
    age: null,
    diet: null,
    city: null,
    wash: null,
    afterwash: null,
    hairGoals2: null,
    conditionerFormula: null,
    shampooFormula: null
  };

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders = async () => {
    try {
      let response = await axios(signedRequest);
      // console.log(response);
      this.setState({
        orders: response.data.orders
      });
      // console.log(this.state.orders);
    } catch (error) {
      console.error(error);
    }
  };

  fetchUserCode = async () => {
    try {
      await axios
        .get(
          `https://fekk.ai/backend/get_formula?user_code=${this.state.note_attributes}`
        )
        .then(res => {
          this.setState({
            csv: res.data,
            thickness: res.data.user_data.answers.hair_thickness,
            texture: res.data.user_data.answers.hair_texture,
            hairCondition: res.data.user_data.answers["hair-condition"],
            hairGoals: res.data.user_data.answers["hair-goals"],
            age: res.data.user_data.answers.age,
            diet: res.data.user_data.answers.diet,
            zip: res.data.user_data.answers.zipcode.zip,
            //zips are populating differently each time
            city: res.data.user_data.weather.city,
            wash: res.data.user_data.answers.wash_frequency,
            afterwash: res.data.user_data.answers.afterwash,
            hairGoals2: res.data.user_data.answers["hair-goals-2"],
            sideSelfie: res.data.user_data["side_selfie"],
            frontSelfie: res.data.user_data["front_selfie"],
            shampooFormula: res.data.ingredients.shampoo.formula,
            conditionerFormula: res.data.ingredients.conditioner.formula
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      validationError,
      name,
      address,
      zip,
      email,
      phone,
      orderNumber,
      createdAt,
      note_attributes,
      thickness,
      texture,
      hairCondition,
      hairGoals,
      age,
      diet,
      city,
      wash,
      afterwash,
      hairGoals2,
      conditionerFormula,
      shampooFormula
    } = this.state;

    return (
      <CustomerDataContext.Provider>
        value={{
          orders: this.state.orders,
          validationError,
          name,
          address,
          zip,
          email,
          phone,
          orderNumber,
          createdAt,
          note_attributes,
          thickness,
          texture,
          hairCondition,
          hairGoals,
          age,
          diet,
          city,
          wash,
          afterwash,
          hairGoals2,
          conditionerFormula,
          shampooFormula
        }}
      </CustomerDataContext.Provider>
    );
  }
}
