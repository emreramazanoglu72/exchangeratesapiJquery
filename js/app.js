const BASE_API_URL = "https://api.exchangerate.host/latest?base=";
const jsonData = [];

const TYPES = [
  {
    title: "USD",
    description: "Amerikan Doları",
  },
  {
    title: "EUR",
    description: "Avrupa Para Birimi",
  },
  {
    title: "JPY",
    description: "Japon Yeni",
  },
  {
    title: "GBP",
    description: "İngiliz Sterlini",
  },
  {
    title: "DKK",
    description: "Danimarka Kronu",
  },
  {
    title: "NOK",
    description: "Norveç Kronu",
  },
];

const Api = (type) => {
  var settings = {
    url: `${BASE_API_URL}${type}`,
    method: "GET",
    timeout: 0,
  };
  return $.ajax(settings).done((response) => response);
};

const generateJson = () => {
  TYPES.map(async (item) => {
    $(".select-current").append(new Option(item.title, item.title));
    Api(item.title).then((res) => {
      jsonData.push({ type: item, value: res.rates["TRY"] });
      $(".exchangerateCardList").append(`
        <div class="mt-2 col">
        <div class="exchangerateCard">
          <div class="row row-cols-lg-4 row-cols-md-4 row-cols-4">
            <div class="flag ">
              <img src="img/${item.title}.png" class="flag" />
            </div>
            <div class="col">
              <span class="text-type-title">${item.title}</span><br /><span
                class="text-type-description w-100"
                >${item.description}</span
              >
            </div>
            <div class="col text-end m-30">
              <span class="text-title">ALIŞ</span><br /><span
                class="text-description"
                >${res.rates["TRY"]}</span
              >
            </div>
            <div class="col text-end">
              <span class="text-title">SATIŞ</span><br /><span
                class="text-description text-right"
                >${res.rates["TRY"]}</span
              >
            </div>
          </div>
        </div>
        <hr class="line" />
      </div>
        `);
    });
  });
  return jsonData;
};

const currencyCalculator = (text) => {
  var foreign = $(".money").val();
  jsonData.map((element) => {
    if (element.type.title == $(".select-current").val()) {
      $(".resultMoney").val(foreign.replaceAll(",", "") * element.value);
    }
  });
};

$(document).ready(function () {
  generateJson();
  new AutoNumeric('.money');
  new AutoNumeric('.resultMoney');
  $(".money").on("keyup", currencyCalculator);
  $(".select-current").on("change", currencyCalculator);

});
