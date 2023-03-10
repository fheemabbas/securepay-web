
const countriesName = [
    {
        id: "AF",
        name: "Afghan",
        name1: "Afghanistan",
        emoji: "๐ฆ๐ซ"
    },
    {
        id: "AX",
        name: "รland Islands",
        name1: "รland Islands",
        emoji: "๐ฆ๐ฝ"
    },
    {
        id: "AL",
        name: "Albanian",
        name1: "Albania",
        emoji: "๐ฆ๐ฑ"
    },
    {
        id: "DZ",
        name: "Algerian",
        name1: "Algeria",
        emoji: "๐ฉ๐ฟ"
    },
    {
        id: "AS",
        name: "American Samoan",
        name1: "American Samoa",
        emoji: "๐ฆ๐ธ"
    },
    {
        id: "AD",
        name: "Andorran",
        name1: "Andorra",
        emoji: "๐ฆ๐ฉ"
    },
    {
        id: "AO",
        name: "Angolan",
        name1: "Angola",
        emoji: "๐ฆ๐ด"
    },
    {
        id: "AI",
        name: "Anguillan",
        name1: "Anguilla",
        emoji: "๐ฆ๐ฎ"
    },
    {
        id: "AG",
        name: "Antiguan or Barbudan",
        name1: "Antigua & Barbuda",
        emoji: "๐ฆ๐ฌ"
    },
    {
        id: "AR",
        name: "Argentine",
        name1: "Argentina",
        emoji: "๐ฆ๐ท"
    },
    {
        id: "AM",
        name: "Armenian",
        name1: "Armenia",
        emoji: "๐ฆ๐ฒ"
    },
    {
        id: "AW",
        name: "Aruban",
        name1: "Aruba",
        emoji: "๐ฆ๐ผ"
    },
    {
        id: "AU",
        name: "Australian",
        name1: "Australia",
        emoji: "๐ฆ๐บ"
    },
    {
        id: "AT",
        name: "Austrian",
        name1: "Austria",
        emoji: "๐ฆ๐น"
    },
    {
        id: "AZ",
        name: "Azerbaijani, Azeri",
        name1: "Azerbaijan",
        emoji: "๐ฆ๐ฟ"
    },
    {
        id: "BS",
        name: "Bahamian",
        name1: "Bahamas",
        emoji: "๐ง๐ธ"
    },
    {
        id: "BH",
        name: "Bahraini",
        name1: "Bahrain",
        emoji: "๐ง๐ญ"
    },
    {
        id: "BD",
        name: "Bangladeshi",
        name1: "Bangladesh",
        emoji: "๐ง๐ฉ"
    },
    {
        id: "BB",
        name: "Barbadian",
        name1: "Barbados",
        emoji: "๐ง๐ง"
    },
    {
        id: "BY",
        name: "Belarusian",
        name1: "Belarus",
        emoji: "๐ง๐พ"
    },
    {
        id: "BE",
        name: "Belgian",
        name1: "Belgium",
        emoji: "๐ง๐ช"
    },
    {
        id: "BZ",
        name: "Belizean",
        name1: "Belize",
        emoji: "๐ง๐ฟ"
    },
    {
        id: "BJ",
        name: "Beninese, Beninois",
        name1: "Benin",
        emoji: "๐ง๐ฏ"
    },
    {
        id: "BM",
        name: "Bermudian, Bermudan",
        name1: "Bermuda",
        emoji: "๐ง๐ฒ"
    },
    {
        id: "BT",
        name: "Bhutanese",
        name1: "Bhutan",
        emoji: "๐ง๐น"
    },
    {
        id: "BO",
        name: "Bolivian",
        name1: "Bolivia",
        emoji: "๐ง๐ด"
    },
    {
        id: "BA",
        name: "Bonaire",
        name1: "Bosnia & Herzegovina",
        emoji: "๐ง๐ฆ"
    },
    {
        id: "BW",
        name: "Motswana, Botswanan",
        name1: "Botswana",
        emoji: "๐ง๐ผ"
    },
    {
        id: "BV",
        name: "Norwegian",
        name1: "Bouvet Island",
        emoji: "๐ง๐ป"
    },
    {
        id: "BR",
        name: "Brazilian",
        name1: "Brazil",
        emoji: "๐ง๐ท"
    },
    {
        id: "IO",
        name: "BIOT",
        name1: "British Indian Ocean Territory",
        emoji: "๐ฎ๐ด"
    },
    {
        id: "VG",
        name: "Bruneian",
        name1: "British Virgin Islands",
        emoji: "๐ป๐ฌ"
    },
    {
        id: "BN",
        name: "Afghan",
        name: "Brunei Darussalam",
        emoji: "๐ง๐ณ"
    },
    {
        id: "BG",
        name: "Bulgarian",
        name1: "Bulgaria",
        emoji: "๐ง๐ฌ"
    },
    {
        id: "BF",
        name: "Burkinabe",
        name: "Burkina Faso",
        emoji: "๐ง๐ซ"
    },
    {
        id: "MM",
        name: "Burmese",
        name1: "Myanmar (Burma)",
        emoji: "๐ฒ๐ฒ"
    },
    {
        id: "BI",
        name: "Burundian",
        name1: "Burundi",
        emoji: "๐ง๐ฎ"
    },
    {
        id: "CV",
        name: "Cape Verdean",
        name1: "Cabo Verde",
        emoji: "๐จ๐ป"
    },
    {
        id: "KH",
        name: "Cambodian",
        name1: "Cambodia",
        emoji: "๐ฐ๐ญ"
    },
    {
        id: "CM",
        name: "Cameroonian",
        name1: "Cameroon",
        emoji: "๐จ๐ฒ"
    },
    {
        id: "CA",
        name: "Canadian",
        name1: "Canada",
        emoji: "๐จ๐ฆ"
    },
    {
        id: "CV",
        name: "Caymanian",
        name1: "Cape Verde",
        emoji: "๐จ๐ป"
    },
    {
        id: "BQ",
        name: "Caribbean",
        name1: "Caribbean Netherlands",
        emoji: "๐ง๐ถ"
    },
    {
        id: "KY",
        name: "Caymanian",
        name1: "Cayman Islands",
        emoji: "๐ฐ๐พ"
    },
    {
        id: "CF",
        name: "Central African",
        name1: "Central African Republic",
        emoji: "๐จ๐ซ"
    },
    {
        id: "TD",
        name: "Chadian",
        name1: "Chad",
        emoji: "๐น๐ฉ"
    },
    {
        id: "CL",
        name: "Chilean",
        name1: "Chile",
        emoji: "๐จ๐ฑ"
    },
    {
        id: "CN",
        name: "Chinese",
        name1: "China",
        emoji: "๐จ๐ณ"
    },
    {
        id: "TW",
        name: "Chinese, Taiwanese",
        name1: "Taiwan",
        emoji: "๐น๐ผ"
    },
    {
        id: "CX",
        name: "Christmas Island",
        name1: "Christmas Island",
        emoji: "๐จ๐ฝ"
    },
    {
        id: "CC",
        name: "Cocos Island",
        name1: "Cocos (Keeling) Islands",
        emoji: "๐จ๐จ"
    },
    {
        id: "CO",
        name: "Colombian",
        name1: "Colombia",
        emoji: "๐จ๐ด"
    },
    {
        id: "KM",
        name: "Comoran, Comorian",
        name1: "Comoros",
        emoji: "๐ฐ๐ฒ"
    },
    {
        id: "CD",
        name: "Congolese",
        name1: "Congo (The Democratic Republic of the Congo)",
        emoji: "๐จ๐ฉ"
    },
    {
        id: "CG",
        name: "Congolese",
        name1: "Congo",
        emoji: "๐จ๐ฌ"
    },
    {
        id: "CK",
        name: "Cook Island",
        name1: "Cook Islands",
        emoji: "๐จ๐ฐ"
    },
    {
        id: "CR",
        name: "Costa Rican",
        name1: "Costa Rica",
        emoji: "๐จ๐ท"
    },
    {
        id: "CI",
        name: "Ivorian",
        name1: "Cรดte dโIvoire",
        emoji: "๐จ๐ฎ"
    },
    {
        id: "HR",
        name1: "Croatian",
        name: "Croatia",
        emoji: "๐ญ๐ท"
    },
    {
        id: "CU",
        name: "Cuban",
        name1: "Cuba",
        emoji: "๐จ๐บ"
    },
    {
        id: "CW",
        name: "Curacaoan",
        name1: "Curaรงao",
        emoji: "๐จ๐ผ"
    },
    {
        id: "CY",
        name: "Cypriot",
        name1: "Cyprus",
        emoji: "๐จ๐พ"
    },
    {
        id: "CZ",
        name: "Czech",
        name1: "Czechia",
        emoji: "๐จ๐ฟ"
    },
    {
        id: "DK",
        name: "Danish",
        name1: "Democratic People's Republic of Korea",
        emoji: "๐ฐ๐ต"
    },
    {
        id: "DK",
        name: "Danish",
        name: "Denmark",
        emoji: "๐ฉ๐ฐ"
    },
    {
        id: "DJ",
        name: "Djiboutian",
        name1: "Djibouti",
        emoji: "๐ฉ๐ฏ"
    },
    {
        id: "DM",
        name: "Dominican",
        name1: "Dominica",
        emoji: "๐ฉ๐ฒ"
    },
    {
        id: "DO",
        name: "Dominican",
        name1: "Dominican Republic",
        emoji: "๐ฉ๐ด"
    },
    {
        id: "EC",
        name: "Ecuadorian",
        name1: "Ecuador",
        emoji: "๐ช๐จ"
    },
    {
        id: "EG",
        name: "Egyptian",
        name1: "Egypt",
        emoji: "๐ช๐ฌ"
    },
    {
        id: "SV",
        name: "Salvadoran",
        name1: "El Salvador",
        emoji: "๐ธ๐ป"
    },
    {
        id: "GB",
        name: "British",
        name1: "United Kingdom",
        emoji: "๐ฌ๐ง"
    },
    {
        id: "GQ",
        name: "Equatorial Guinean, Equatoguinean",
        name1: "Equatorial Guinea",
        emoji: "๐ฌ๐ถ"
    },
    {
        id: "ER",
        name: "Eritrean",
        name1: "Eritrea",
        emoji: "๐ช๐ท"
    },
    {
        id: "EE",
        name: "Estonian",
        name1: "Estonia",
        emoji: "๐ช๐ช"
    },
    {
        id: "ET",
        name: "Ethiopian",
        name1: "Ethiopia",
        emoji: "๐ช๐น"
    },
    {
        id: "FK",
        name: "Falkland Island",
        name1: "Falkland Islands",
        emoji: "๐ซ๐ฐ"
    },
    {
        id: "FO",
        name: "Faroese",
        name1: "Faroe Islands",
        emoji: "๐ซ๐ด"
    },
    {
        id: "FJ",
        name: "Fijian",
        name1: "Fiji",
        emoji: "๐ซ๐ฏ"
    },
    {
        id: "FI",
        name: "Finnish",
        name1: "Finland",
        emoji: "๐ซ๐ฎ"
    },
    {
        id: "FR",
        name: "French",
        name1: "France",
        emoji: "๐ซ๐ท"
    },
    {
        id: "GF",
        name: "French Guianese",
        name1: "French Guiana",
        emoji: "๐ฌ๐ซ"
    },
    {
        id: "PF",
        name: "French Polynesian",
        name1: "French Polynesia",
        emoji: "๐ต๐ซ"
    },
    // {
    //     id: "TF",
    //     name: "French Southern Territories",
    //     name: "French Southern Territories",
    //     emoji: "๐น๐ซ"
    // },
    {
        id: "GA",
        name: "Gabonese",
        name1: "Gabon",
        emoji: "๐ฌ๐ฆ"
    },
    {
        id: "GM",
        name: "Gambian",
        name1: "Gambia",
        emoji: "๐ฌ๐ฒ"
    },
    {
        id: "GE",
        name: "Georgian",
        name1: "Georgia",
        emoji: "๐ฌ๐ช"
    },
    {
        id: "DE",
        name: "German",
        name1: "Germany",
        emoji: "๐ฉ๐ช"
    },
    {
        id: "GH",
        name: "Ghanaian",
        name1: "Ghana",
        emoji: "๐ฌ๐ญ"
    },
    {
        id: "GI",
        name: "Gibraltar",
        name1: "Gibraltar",
        emoji: "๐ฌ๐ฎ"
    },
    {
        id: "GR",
        name: "Greek, Hellenic",
        name1: "Greece",
        emoji: "๐ฌ๐ท"
    },
    {
        id: "GL",
        name: "Greenlandic",
        name1: "Greenland",
        emoji: "๐ฌ๐ฑ"
    },
    {
        id: "GD",
        name: "Grenadian",
        name1: "Grenada",
        emoji: "๐ฌ๐ฉ"
    },
    {
        id: "GP",
        name: "Guadeloupe",
        name1: "Guadeloupe",
        emoji: "๐ฌ๐ต"
    },
    {
        id: "GU",
        name: "Guamanian, Guambat",
        name1: "Guam",
        emoji: "๐ฌ๐บ"
    },
    {
        id: "GT",
        name: "Guatemalan",
        name1: "Guatemala",
        emoji: "๐ฌ๐น"
    },
    {
        id: "GG",
        name: "Channel Island",
        name1: "Guernsey",
        emoji: "๐ฌ๐ฌ"
    },
    {
        id: "GN",
        name: "Guinean",
        name1: "Guinea",
        emoji: "๐ฌ๐ณ"
    },
    {
        id: "GW",
        name: "Bissau-Guinean",
        name1: "Guinea-Bissau",
        emoji: "๐ฌ๐ผ"
    },
    {
        id: "GY",
        name: "Guyanese",
        name1: "Guyana",
        emoji: "๐ฌ๐พ"
    },
    {
        id: "HT",
        name: "Haitian",
        name1: "Haiti",
        emoji: "๐ญ๐น"
    },
    {
        id: "HM",
        name: "Australian",
        name1: "Heard Island and McDonald Islands",
        emoji: "๐ญ๐ฒ"
    },
    {
        id: "HN",
        name: "Honduran",
        name1: "Honduras",
        emoji: "๐ญ๐ณ"
    },
    {
        id: "HK",
        name: "Hong Kong, Hong Kongese",
        name1: "Hong Kong",
        emoji: "๐ญ๐ฐ"
    },
    {
        id: "HU",
        name: "Hungarian, Magyar",
        name1: "Hungary",
        emoji: "๐ญ๐บ"
    },
    {
        id: "IS",
        name: "Icelandic",
        name1: "Iceland",
        emoji: "๐ฎ๐ธ"
    },
    {
        id: "IN",
        name: "Indian",
        name1: "India",
        emoji: "๐ฎ๐ณ"
    },
    {
        id: "ID",
        name: "Indonesian",
        name1: "Indonesia",
        emoji: "๐ฎ๐ฉ"
    },
    {
        id: "IR",
        name: "Iranian",
        name1: "Iran",
        emoji: "๐ฎ๐ท"
    },
    {
        id: "IQ",
        name: "Iraqi",
        name1: "Iraq",
        emoji: "๐ฎ๐ถ"
    },
    {
        id: "IE",
        name: "Irish",
        name1: "Ireland",
        emoji: "๐ฎ๐ช"
    },
    {
        id: "IM",
        name: "Manx",
        name1: "Isle of Man",
        emoji: "๐ฎ๐ฒ"
    },
    {
        id: "IL",
        name: "Israeli",
        name1: "Israel",
        emoji: "๐ฎ๐ฑ"
    },
    {
        id: "IT",
        name: "Italian",
        name1: "Italy",
        emoji: "๐ฎ๐น"
    },
    {
        id: "JM",
        name: "Jamaican",
        name1: "Jamaica",
        emoji: "๐ฏ๐ฒ"
    },
    {
        id: "SJ",
        name: "Jan Mayen",
        emoji: "๐ธ๐ฏ"
    },
    {
        id: "JP",
        name: "Japanese",
        name1: "Japan",
        emoji: "๐ฏ๐ต"
    },
    {
        id: "JE",
        name: "Channel Island",
        name1: "Jersey",
        emoji: "๐ฏ๐ช"
    },
    {
        id: "JO",
        name: "Jordanian",
        name1: "Jordan",
        emoji: "๐ฏ๐ด"
    },
    {
        id: "KZ",
        name: "Kazakhstani",
        name1: "Kazakhstan",
        emoji: "๐ฐ๐ฟ"
    },
    {
        id: "KE",
        name: "Kenyan",
        name1: "Kenya",
        emoji: "๐ฐ๐ช"
    },
    {
        id: "KI",
        name: "I-Kiribati",
        name1: "Kiribati",
        emoji: "๐ฐ๐ฎ"
    },
    {
        id: "KW",
        name: "Kuwaiti",
        name1: "Kuwait",
        emoji: "๐ฐ๐ผ"
    },
    {
        id: "KG",
        name: "Kyrgyz",
        name1: "Kyrgyzstan",
        emoji: "๐ฐ๐ฌ"
    },
    {
        id: "LA",
        name: "Lao, Laotian",
        name1: "Lao People's Democratic Republic",
        emoji: "๐ฑ๐ฆ"
    },
    {
        id: "LV",
        name: "Latvian",
        name1: "Latvia",
        emoji: "๐ฑ๐ป"
    },
    {
        id: "LB",
        name: "Lebanese",
        name1: "Lebanon",
        emoji: "๐ฑ๐ง"
    },
    {
        id: "LS",
        name: "Basotho",
        name1: "Lesotho",
        emoji: "๐ฑ๐ธ"
    },
    {
        id: "LR",
        name: "Liberian",
        name1: "Liberia",
        emoji: "๐ฑ๐ท"
    },
    {
        id: "LY",
        name: "Libyan",
        name1: "Libya",
        emoji: "๐ฑ๐พ"
    },
    {
        id: "LI",
        name: "Liechtenstein",
        name1: "Liechtenstein",
        emoji: "๐ฑ๐ฎ"
    },
    {
        id: "LT",
        name: "Lithuanian",
        name1: "Lithuania",
        emoji: "๐ฑ๐น"
    },
    {
        id: "LU",
        name: "Luxembourgish",
        name1: "Luxembourg",
        emoji: "๐ฑ๐บ"
    },
    {
        id: "MO",
        name: "Macau SAR China",
        name1: "Macanese",
        emoji: "๐ฒ๐ด"
    },
    {
        id: "MK",
        name: "North Macedonia",
        name1: "Macedonian",
        emoji: "๐ฒ๐ฐ"
    },
    {
        id: "MG",
        name: "Madagascar",
        name1: "Malagasy",
        emoji: "๐ฒ๐ฌ"
    },
    {
        id: "MW",
        name: "Malawi",
        name1: "Malawian",
        emoji: "๐ฒ๐ผ"
    },
    {
        id: "MY",
        name: "Malaysia",
        name1: "Malaysian",
        emoji: "๐ฒ๐พ"
    },
    {
        id: "MV",
        name: "Maldives",
        name1: "Maldivian",
        emoji: "๐ฒ๐ป"
    },
    {
        id: "ML",
        name: "Malian",
        name1: "Mali",
        emoji: "๐ฒ๐ฑ"
    },
    {
        id: "MT",
        name: "Maltese",
        name1: "Malta",
        emoji: "๐ฒ๐น"
    },
    {
        id: "MH",
        name: "Marshallese",
        name1: "Marshall Islands",
        emoji: "๐ฒ๐ญ"
    },
    {
        id: "MQ",
        name: "Martiniquais",
        name1: "Martinique",
        emoji: "๐ฒ๐ถ"
    },
    {
        id: "MR",
        name: "Mauritanian",
        name1: "Mauritania",
        emoji: "๐ฒ๐ท"
    },
    {
        id: "MU",
        name: "Mauritian",
        name1: "Mauritius",
        emoji: "๐ฒ๐บ"
    },
    {
        id: "YT",
        name: "Mahoran",
        name1: "Mayotte",
        emoji: "๐พ๐น"
    },
    {
        id: "MX",
        name: "Mexican",
        name1: "Mexico",
        emoji: "๐ฒ๐ฝ"
    },
    {
        id: "FM",
        name: "Micronesian",
        name1: "Micronesia",
        emoji: "๐ซ๐ฒ"
    },
    {
        id: "MD",
        name: "Moldovan",
        name1: "Moldova",
        emoji: "๐ฒ๐ฉ"
    },
    {
        id: "MC",
        name: "Monegasque",
        name1: "Monaco",
        emoji: "๐ฒ๐จ"
    },
    {
        id: "MN",
        name: "Mongolian",
        name1: "Mongolia",
        emoji: "๐ฒ๐ณ"
    },
    {
        id: "ME",
        name: "Montenegrin",
        name1: "Montenegro",
        emoji: "๐ฒ๐ช"
    },
    {
        id: "MS",
        name: "Montserratian",
        name1: "Montserrat",
        emoji: "๐ฒ๐ธ"
    },
    {
        id: "MA",
        name: "Moroccan",
        name1: "Morocco",
        emoji: "๐ฒ๐ฆ"
    },
    {
        id: "MZ",
        name: "Mozambican",
        name1: "Mozambique",
        emoji: "๐ฒ๐ฟ"
    },
    {
        id: "MM",
        name: "Burmese",
        name1: "Myanmar (Burma)",
        emoji: "๐ฒ๐ฒ"
    },
    {
        id: "NA",
        name: "Namibian",
        name1: "Namibia",
        emoji: "๐ณ๐ฆ"
    },
    {
        id: "NR",
        name: "Nauruan",
        name1: "Nauru",
        emoji: "๐ณ๐ท"
    },
    {
        id: "NP",
        name: "Nepali",
        name1: "Nepal",
        emoji: "๐ณ๐ต"
    },
    {
        id: "NL",
        name: "Dutch",
        name1: "Netherlands",
        emoji: "๐ณ๐ฑ"
    },
    {
        id: "NC",
        name: "New Caledonian",
        name1: "New Caledonia",
        emoji: "๐ณ๐จ"
    },
    {
        id: "NZ",
        name: "New Zealand",
        name1: "New Zealand",
        emoji: "๐ณ๐ฟ"
    },
    {
        id: "NI",
        name: "Nicaraguan",
        name1: "Nicaragua",
        emoji: "๐ณ๐ฎ"
    },
    {
        id: "NE",
        name: "Nigerien",
        name1: "Niger",
        emoji: "๐ณ๐ช"
    },
    {
        id: "NG",
        name: "Nigerian",
        name1: "Nigeria",
        emoji: "๐ณ๐ฌ"
    },
    {
        id: "NU",
        name: "Niuean",
        name1: "Niue",
        emoji: "๐ณ๐บ"
    },
    {
        id: "NF",
        name: "Norfolk Island",
        name1: "Norfolk Island",
        emoji: "๐ณ๐ซ"
    },
    {
        id: "KP",
        name: "North Korean",
        name1: "North Korea",
        emoji: "๐ฐ๐ต"
    },
    {
        id: "MP",
        name: "Northern Marianan",
        name1: "Northern Islands",
        emoji: "๐ฒ๐ต"
    },
    {
        id: "NO",
        name: "Norwegian",
        name1: "Norway",
        emoji: "๐ณ๐ด"
    },
    {
        id: "OM",
        name: "Omani",
        name1: "Oman",
        emoji: "๐ด๐ฒ"
    },
    {
        id: "PK",
        name: "Pakistani",
        name1: "Pakistan",
        emoji: "๐ต๐ฐ"
    },
    {
        id: "PW",
        name: "Palauan",
        name1: "Palau",
        emoji: "๐ต๐ผ"
    },
    {
        id: "PA",
        name: "Panamanian",
        name1: "Panama",
        emoji: "๐ต๐ฆ"
    },
    {
        id: "PG",
        name: "Papuan",
        name1: "Papua New Guinea",
        emoji: "๐ต๐ฌ"
    },
    {
        id: "PY",
        name: "Paraguayan",
        name1: "Paraguay",
        emoji: "๐ต๐พ"
    },
    {
        id: "PE",
        name: "Peruvian",
        name1: "Peru",
        emoji: "๐ต๐ช"
    },
    {
        id: "PH",
        name: "Philippine",
        name1: "Philippines",
        emoji: "๐ต๐ญ"
    },
    {
        id: "PL",
        name: "Polish",
        name1: "Poland",
        emoji: "๐ต๐ฑ"
    },
    {
        id: "PT",
        name: "Portuguese",
        name1: "Portugal",
        emoji: "๐ต๐น"
    },
    {
        id: "PR",
        name: "Puerto Rican",
        name1: "Puerto Rico",
        emoji: "๐ต๐ท"
    },
    {
        id: "QA",
        name: "Qatari",
        name1: "Qatar",
        emoji: "๐ถ๐ฆ"
    },
    {
        id: "CG",
        name: "Republic of the Congo",
        emoji: "๐จ๐ฌ"
    },
    {
        id: "RE",
        name: "Reunionese",
        name1: "Rรฉunion",
        emoji: "๐ท๐ช"
    },
    {
        id: "RO",
        name: "Romanian",
        name1: "Romania",
        emoji: "๐ท๐ด"
    },
    {
        id: "RW",
        name: "Rwandan",
        name1: "Rwanda",
        emoji: "๐ท๐ผ"
    },
    {
        id: "SH",
        name: "Saint Helenian",
        name1: "St. Helena",
        emoji: "๐ธ๐ญ"
    },
    {
        id: "AC",
        name: "Ascension Island",
        emoji: "๐ฆ๐จ"
    },
    {
        id: "TA",
        name: "Tristan da Cunha",
        emoji: "๐น๐ฆ"
    },
    {
        id: "LC",
        name: "Saint Lucian",
        name1: "St. Lucia",
        emoji: "๐ฑ๐จ"
    },
    {
        id: "KN",
        name: "Kittitian",
        name1: "St. Kitts & Nevis",
        emoji: "๐ฐ๐ณ"
    },
    {
        id: "MF",
        name: "Saint-Martinoise",
        name1: "St. Martin",
        emoji: "๐ฒ๐ซ"
    },
    {
        id: "BL",
        name: "St. Barthรฉlemy",
        emoji: "๐ง๐ฑ"
    },
    {
        id: "PM",
        name: "Saint-Pierrais",
        name1: "St. Pierre & Miquelon",
        emoji: "๐ต๐ฒ"
    },
    {
        id: "VC",
        name: "Vincentian",
        name1: "St. Vincent & Grenadines",
        emoji: "๐ป๐จ"
    },
    {
        id: "WS",
        name: "Samoan",
        name1: "Samoa",
        emoji: "๐ผ๐ธ"
    },
    {
        id: "SM",
        name: "Sammarinese",
        name1: "San Marino",
        emoji: "๐ธ๐ฒ"
    },
    {
        id: "ST",
        name: "Sao Tomean",
        name1: "Sรฃo Tomรฉ & Prรญncipe",
        emoji: "๐ธ๐น"
    },
    {
        id: "SA",
        name: "Saudi",
        name1: "Saudi Arabia",
        emoji: "๐ธ๐ฆ"
    },
    {
        id: "SN",
        name: "Senegalese",
        name1: "Senegal",
        emoji: "๐ธ๐ณ"
    },
    {
        id: "RS",
        name: "Serbian",
        name1: "Serbia",
        emoji: "๐ท๐ธ"
    },
    {
        id: "SC",
        name: "Seychellois",
        name1: "Seychelles",
        emoji: "๐ธ๐จ"
    },
    {
        id: "SL",
        name: "Sierra Leonean",
        name1: "Sierra Leone",
        emoji: "๐ธ๐ฑ"
    },
    {
        id: "SG",
        name: "Singaporean",
        name1: "Singapore",
        emoji: "๐ธ๐ฌ"
    },
    {
        id: "SX",
        name: "Sint Maarten",
        name1: "Sint Maarten",
        emoji: "๐ธ๐ฝ"
    },
    {
        id: "SK",
        name: "Slovak",
        name1: "Slovakia",
        emoji: "๐ธ๐ฐ"
    },
    {
        id: "SI",
        name: "Slovenian",
        name1: "Slovenia",
        emoji: "๐ธ๐ฎ"
    },
    {
        id: "SB",
        name: "Solomon Island",
        name1: "Solomon Islands",
        emoji: "๐ธ๐ง"
    },
    {
        id: "SO",
        name: "Somali",
        name: "Somalia",
        emoji: "๐ธ๐ด"
    },
    {
        id: "ZA",
        name: "South African",
        name1: "South Africa",
        emoji: "๐ฟ๐ฆ"
    },
    {
        id: "GS",
        name: "South Georgian & South Sandwich Islander",
        name1: "South Georgia & South Sandwich Islands",
        emoji: "๐ฌ๐ธ"
    },
    {
        id: "SS",
        name: "South Sudan",
        name1: "South Sudanese",
        emoji: "๐ธ๐ธ"
    },
    {
        id: "ES",
        name: "Spanish",
        name1: "Spain",
        emoji: "๐ช๐ธ"
    },
    {
        id: "LK",
        name: "Sri Lankan",
        name1: "Sri Lanka",
        emoji: "๐ฑ๐ฐ"
    },
    {
        id: "SD",
        name: "Sudanese",
        name1: "Sudan",
        emoji: "๐ธ๐ฉ"
    },
    {
        id: "SR",
        name: "Surinamese",
        name1: "Suriname",
        emoji: "๐ธ๐ท"
    },
    {
        id: "SJ",
        name: "Svalbard",
        name1: "Svalbard & Jan Mayen",
        emoji: "๐ธ๐ฏ"
    },
    {
        id: "CH",
        name: "Swazi",
        name1: "Switzerland",
        emoji: "๐จ๐ญ"
    },
    {
        id: "TJ",
        name: "Tajikistani",
        name1: "Tajikistan",
        emoji: "๐น๐ฏ"
    },
    {
        id: "TZ",
        name: "Tanzanian",
        name1: "Tanzania",
        emoji: "๐น๐ฟ"
    },
    {
        id: "TH",
        name: "Thai",
        name1: "Thailand",
        emoji: "๐น๐ญ"
    },
    {
        id: "TL",
        name: "Timorese",
        name1: "Timor-Leste",
        emoji: "๐น๐ฑ"
    },
    {
        id: "TG",
        name: "Togolese",
        name1: "Togo",
        emoji: "๐น๐ฌ"
    },
    {
        id: "TK",
        name: "Tokelauan",
        name1: "Tokelau",
        emoji: "๐น๐ฐ"
    },
    {
        id: "TO",
        name: "Tongan",
        name1: "Tonga",
        emoji: "๐น๐ด"
    },
    {
        id: "TT",
        name: "Trinidadian",
        name1: "Trinidad & Tobago",
        emoji: "๐น๐น"
    },
    {
        id: "TN",
        name: "Tunisian",
        name1: "Tunisia",
        emoji: "๐น๐ณ"
    },
    {
        id: "TR",
        name: "Turkish",
        name1: "Turkey",
        emoji: "๐น๐ท"
    },
    {
        id: "TM",
        name: "Turkmen",
        name1: "Turkmenistan",
        emoji: "๐น๐ฒ"
    },
    {
        id: "TC",
        name: "Turks and Caicos Island",
        name1: "Turks & Caicos Islands",
        emoji: "๐น๐จ"
    },
    {
        id: "TV",
        name: "Tuvaluan",
        name1: "Tuvalu",
        emoji: "๐น๐ป"
    },
    {
        id: "UG",
        name: "Ugandan",
        name1: "Uganda",
        emoji: "๐บ๐ฌ"
    },
    {
        id: "UA",
        name: "Ukrainian",
        name1: "Ukraine",
        emoji: "๐บ๐ฆ"
    },
    {
        id: "AE",
        name: "Emirati",
        name1: "United Arab Emirates",
        emoji: "๐ฆ๐ช"
    },
    {
        id: "VI",
        name: "American Virgin Islander",
        name1: "U.S. Virgin Islands",
        emoji: "๐ป๐ฎ"
    },
    {
        id: "UY",
        name: "Uruguayan",
        name1: "Uruguay",
        emoji: "๐บ๐พ"
    },
    {
        id: "UZ",
        name: "Uzbek",
        name1: "Uzbekistan",
        emoji: "๐บ๐ฟ"
    },
    {
        id: "VU",
        name: "Vanuatuan",
        name1: "Vanuatu",
        emoji: "๐ป๐บ"
    },
    {
        id: "VA",
        name: "Vatican",
        name1: "Vatican City",
        emoji: "๐ป๐ฆ"
    },
    {
        id: "VE",
        name: "Venezuelan",
        name1: "Venezuela",
        emoji: "๐ป๐ช"
    },
    {
        id: "VN",
        name: "Vietnamese",
        name1: "Vietnam",
        emoji: "๐ป๐ณ"
    },
    {
        id: "EH",
        name: "Sahrawi",
        name1: "Western Sahara",
        emoji: "๐ช๐ญ"
    },
    {
        id: "YE",
        name: "Yemeni",
        name1: "Yemen",
        emoji: "๐พ๐ช"
    },
    {
        id: "ZM",
        name: "Zambian",
        name1: "Zambia",
        emoji: "๐ฟ๐ฒ"
    },
    {
        id: "ZW",
        name: "Zimbabwean",
        name1: "Zimbabwe",
        emoji: "๐ฟ๐ผ"
    },
    {
        id: "SZ",
        name: "Swazi",
        name1: "Swaziland",
        emoji: "๐ธ๐ฟ"
    },
    {
        id: "WF",
        name: "Wallisian",
        name1: "Wallis & Futuna",
        emoji: "๐ผ๐ซ"
    },
    {
        id: "US",
        name: "American",
        name1: "United States",
        emoji: "๐บ๐ธ"
    },
    {
        id: "PS",
        name: "Palestinians",
        name1: "Palestinian Territories",
        emoji: "๐ต๐ธ"
    },
]

function dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    }
}
function deduplicate(data) {
    if (data.length > 0) {
        var result = [];

        data.forEach(function (elem) {
           let index = result.findIndex((a) => a.name === elem.name)
            if (index === -1) {
                result.push(elem);
            }
        });

        return result;
    }
}

let countriesname = countriesName.sort(dynamicSort("name"))
countriesname = deduplicate(countriesname);
export default countriesname
