
const countriesName = [
    {
        id: "AF",
        name: "Afghan",
        name1: "Afghanistan",
        emoji: "🇦🇫"
    },
    {
        id: "AX",
        name: "Åland Islands",
        name1: "Åland Islands",
        emoji: "🇦🇽"
    },
    {
        id: "AL",
        name: "Albanian",
        name1: "Albania",
        emoji: "🇦🇱"
    },
    {
        id: "DZ",
        name: "Algerian",
        name1: "Algeria",
        emoji: "🇩🇿"
    },
    {
        id: "AS",
        name: "American Samoan",
        name1: "American Samoa",
        emoji: "🇦🇸"
    },
    {
        id: "AD",
        name: "Andorran",
        name1: "Andorra",
        emoji: "🇦🇩"
    },
    {
        id: "AO",
        name: "Angolan",
        name1: "Angola",
        emoji: "🇦🇴"
    },
    {
        id: "AI",
        name: "Anguillan",
        name1: "Anguilla",
        emoji: "🇦🇮"
    },
    {
        id: "AG",
        name: "Antiguan or Barbudan",
        name1: "Antigua & Barbuda",
        emoji: "🇦🇬"
    },
    {
        id: "AR",
        name: "Argentine",
        name1: "Argentina",
        emoji: "🇦🇷"
    },
    {
        id: "AM",
        name: "Armenian",
        name1: "Armenia",
        emoji: "🇦🇲"
    },
    {
        id: "AW",
        name: "Aruban",
        name1: "Aruba",
        emoji: "🇦🇼"
    },
    {
        id: "AU",
        name: "Australian",
        name1: "Australia",
        emoji: "🇦🇺"
    },
    {
        id: "AT",
        name: "Austrian",
        name1: "Austria",
        emoji: "🇦🇹"
    },
    {
        id: "AZ",
        name: "Azerbaijani, Azeri",
        name1: "Azerbaijan",
        emoji: "🇦🇿"
    },
    {
        id: "BS",
        name: "Bahamian",
        name1: "Bahamas",
        emoji: "🇧🇸"
    },
    {
        id: "BH",
        name: "Bahraini",
        name1: "Bahrain",
        emoji: "🇧🇭"
    },
    {
        id: "BD",
        name: "Bangladeshi",
        name1: "Bangladesh",
        emoji: "🇧🇩"
    },
    {
        id: "BB",
        name: "Barbadian",
        name1: "Barbados",
        emoji: "🇧🇧"
    },
    {
        id: "BY",
        name: "Belarusian",
        name1: "Belarus",
        emoji: "🇧🇾"
    },
    {
        id: "BE",
        name: "Belgian",
        name1: "Belgium",
        emoji: "🇧🇪"
    },
    {
        id: "BZ",
        name: "Belizean",
        name1: "Belize",
        emoji: "🇧🇿"
    },
    {
        id: "BJ",
        name: "Beninese, Beninois",
        name1: "Benin",
        emoji: "🇧🇯"
    },
    {
        id: "BM",
        name: "Bermudian, Bermudan",
        name1: "Bermuda",
        emoji: "🇧🇲"
    },
    {
        id: "BT",
        name: "Bhutanese",
        name1: "Bhutan",
        emoji: "🇧🇹"
    },
    {
        id: "BO",
        name: "Bolivian",
        name1: "Bolivia",
        emoji: "🇧🇴"
    },
    {
        id: "BA",
        name: "Bonaire",
        name1: "Bosnia & Herzegovina",
        emoji: "🇧🇦"
    },
    {
        id: "BW",
        name: "Motswana, Botswanan",
        name1: "Botswana",
        emoji: "🇧🇼"
    },
    {
        id: "BV",
        name: "Norwegian",
        name1: "Bouvet Island",
        emoji: "🇧🇻"
    },
    {
        id: "BR",
        name: "Brazilian",
        name1: "Brazil",
        emoji: "🇧🇷"
    },
    {
        id: "IO",
        name: "BIOT",
        name1: "British Indian Ocean Territory",
        emoji: "🇮🇴"
    },
    {
        id: "VG",
        name: "Bruneian",
        name1: "British Virgin Islands",
        emoji: "🇻🇬"
    },
    {
        id: "BN",
        name: "Afghan",
        name: "Brunei Darussalam",
        emoji: "🇧🇳"
    },
    {
        id: "BG",
        name: "Bulgarian",
        name1: "Bulgaria",
        emoji: "🇧🇬"
    },
    {
        id: "BF",
        name: "Burkinabe",
        name: "Burkina Faso",
        emoji: "🇧🇫"
    },
    {
        id: "MM",
        name: "Burmese",
        name1: "Myanmar (Burma)",
        emoji: "🇲🇲"
    },
    {
        id: "BI",
        name: "Burundian",
        name1: "Burundi",
        emoji: "🇧🇮"
    },
    {
        id: "CV",
        name: "Cape Verdean",
        name1: "Cabo Verde",
        emoji: "🇨🇻"
    },
    {
        id: "KH",
        name: "Cambodian",
        name1: "Cambodia",
        emoji: "🇰🇭"
    },
    {
        id: "CM",
        name: "Cameroonian",
        name1: "Cameroon",
        emoji: "🇨🇲"
    },
    {
        id: "CA",
        name: "Canadian",
        name1: "Canada",
        emoji: "🇨🇦"
    },
    {
        id: "CV",
        name: "Caymanian",
        name1: "Cape Verde",
        emoji: "🇨🇻"
    },
    {
        id: "BQ",
        name: "Caribbean",
        name1: "Caribbean Netherlands",
        emoji: "🇧🇶"
    },
    {
        id: "KY",
        name: "Caymanian",
        name1: "Cayman Islands",
        emoji: "🇰🇾"
    },
    {
        id: "CF",
        name: "Central African",
        name1: "Central African Republic",
        emoji: "🇨🇫"
    },
    {
        id: "TD",
        name: "Chadian",
        name1: "Chad",
        emoji: "🇹🇩"
    },
    {
        id: "CL",
        name: "Chilean",
        name1: "Chile",
        emoji: "🇨🇱"
    },
    {
        id: "CN",
        name: "Chinese",
        name1: "China",
        emoji: "🇨🇳"
    },
    {
        id: "TW",
        name: "Chinese, Taiwanese",
        name1: "Taiwan",
        emoji: "🇹🇼"
    },
    {
        id: "CX",
        name: "Christmas Island",
        name1: "Christmas Island",
        emoji: "🇨🇽"
    },
    {
        id: "CC",
        name: "Cocos Island",
        name1: "Cocos (Keeling) Islands",
        emoji: "🇨🇨"
    },
    {
        id: "CO",
        name: "Colombian",
        name1: "Colombia",
        emoji: "🇨🇴"
    },
    {
        id: "KM",
        name: "Comoran, Comorian",
        name1: "Comoros",
        emoji: "🇰🇲"
    },
    {
        id: "CD",
        name: "Congolese",
        name1: "Congo (The Democratic Republic of the Congo)",
        emoji: "🇨🇩"
    },
    {
        id: "CG",
        name: "Congolese",
        name1: "Congo",
        emoji: "🇨🇬"
    },
    {
        id: "CK",
        name: "Cook Island",
        name1: "Cook Islands",
        emoji: "🇨🇰"
    },
    {
        id: "CR",
        name: "Costa Rican",
        name1: "Costa Rica",
        emoji: "🇨🇷"
    },
    {
        id: "CI",
        name: "Ivorian",
        name1: "Côte d’Ivoire",
        emoji: "🇨🇮"
    },
    {
        id: "HR",
        name1: "Croatian",
        name: "Croatia",
        emoji: "🇭🇷"
    },
    {
        id: "CU",
        name: "Cuban",
        name1: "Cuba",
        emoji: "🇨🇺"
    },
    {
        id: "CW",
        name: "Curacaoan",
        name1: "Curaçao",
        emoji: "🇨🇼"
    },
    {
        id: "CY",
        name: "Cypriot",
        name1: "Cyprus",
        emoji: "🇨🇾"
    },
    {
        id: "CZ",
        name: "Czech",
        name1: "Czechia",
        emoji: "🇨🇿"
    },
    {
        id: "DK",
        name: "Danish",
        name1: "Democratic People's Republic of Korea",
        emoji: "🇰🇵"
    },
    {
        id: "DK",
        name: "Danish",
        name: "Denmark",
        emoji: "🇩🇰"
    },
    {
        id: "DJ",
        name: "Djiboutian",
        name1: "Djibouti",
        emoji: "🇩🇯"
    },
    {
        id: "DM",
        name: "Dominican",
        name1: "Dominica",
        emoji: "🇩🇲"
    },
    {
        id: "DO",
        name: "Dominican",
        name1: "Dominican Republic",
        emoji: "🇩🇴"
    },
    {
        id: "EC",
        name: "Ecuadorian",
        name1: "Ecuador",
        emoji: "🇪🇨"
    },
    {
        id: "EG",
        name: "Egyptian",
        name1: "Egypt",
        emoji: "🇪🇬"
    },
    {
        id: "SV",
        name: "Salvadoran",
        name1: "El Salvador",
        emoji: "🇸🇻"
    },
    {
        id: "GB",
        name: "British",
        name1: "United Kingdom",
        emoji: "🇬🇧"
    },
    {
        id: "GQ",
        name: "Equatorial Guinean, Equatoguinean",
        name1: "Equatorial Guinea",
        emoji: "🇬🇶"
    },
    {
        id: "ER",
        name: "Eritrean",
        name1: "Eritrea",
        emoji: "🇪🇷"
    },
    {
        id: "EE",
        name: "Estonian",
        name1: "Estonia",
        emoji: "🇪🇪"
    },
    {
        id: "ET",
        name: "Ethiopian",
        name1: "Ethiopia",
        emoji: "🇪🇹"
    },
    {
        id: "FK",
        name: "Falkland Island",
        name1: "Falkland Islands",
        emoji: "🇫🇰"
    },
    {
        id: "FO",
        name: "Faroese",
        name1: "Faroe Islands",
        emoji: "🇫🇴"
    },
    {
        id: "FJ",
        name: "Fijian",
        name1: "Fiji",
        emoji: "🇫🇯"
    },
    {
        id: "FI",
        name: "Finnish",
        name1: "Finland",
        emoji: "🇫🇮"
    },
    {
        id: "FR",
        name: "French",
        name1: "France",
        emoji: "🇫🇷"
    },
    {
        id: "GF",
        name: "French Guianese",
        name1: "French Guiana",
        emoji: "🇬🇫"
    },
    {
        id: "PF",
        name: "French Polynesian",
        name1: "French Polynesia",
        emoji: "🇵🇫"
    },
    // {
    //     id: "TF",
    //     name: "French Southern Territories",
    //     name: "French Southern Territories",
    //     emoji: "🇹🇫"
    // },
    {
        id: "GA",
        name: "Gabonese",
        name1: "Gabon",
        emoji: "🇬🇦"
    },
    {
        id: "GM",
        name: "Gambian",
        name1: "Gambia",
        emoji: "🇬🇲"
    },
    {
        id: "GE",
        name: "Georgian",
        name1: "Georgia",
        emoji: "🇬🇪"
    },
    {
        id: "DE",
        name: "German",
        name1: "Germany",
        emoji: "🇩🇪"
    },
    {
        id: "GH",
        name: "Ghanaian",
        name1: "Ghana",
        emoji: "🇬🇭"
    },
    {
        id: "GI",
        name: "Gibraltar",
        name1: "Gibraltar",
        emoji: "🇬🇮"
    },
    {
        id: "GR",
        name: "Greek, Hellenic",
        name1: "Greece",
        emoji: "🇬🇷"
    },
    {
        id: "GL",
        name: "Greenlandic",
        name1: "Greenland",
        emoji: "🇬🇱"
    },
    {
        id: "GD",
        name: "Grenadian",
        name1: "Grenada",
        emoji: "🇬🇩"
    },
    {
        id: "GP",
        name: "Guadeloupe",
        name1: "Guadeloupe",
        emoji: "🇬🇵"
    },
    {
        id: "GU",
        name: "Guamanian, Guambat",
        name1: "Guam",
        emoji: "🇬🇺"
    },
    {
        id: "GT",
        name: "Guatemalan",
        name1: "Guatemala",
        emoji: "🇬🇹"
    },
    {
        id: "GG",
        name: "Channel Island",
        name1: "Guernsey",
        emoji: "🇬🇬"
    },
    {
        id: "GN",
        name: "Guinean",
        name1: "Guinea",
        emoji: "🇬🇳"
    },
    {
        id: "GW",
        name: "Bissau-Guinean",
        name1: "Guinea-Bissau",
        emoji: "🇬🇼"
    },
    {
        id: "GY",
        name: "Guyanese",
        name1: "Guyana",
        emoji: "🇬🇾"
    },
    {
        id: "HT",
        name: "Haitian",
        name1: "Haiti",
        emoji: "🇭🇹"
    },
    {
        id: "HM",
        name: "Australian",
        name1: "Heard Island and McDonald Islands",
        emoji: "🇭🇲"
    },
    {
        id: "HN",
        name: "Honduran",
        name1: "Honduras",
        emoji: "🇭🇳"
    },
    {
        id: "HK",
        name: "Hong Kong, Hong Kongese",
        name1: "Hong Kong",
        emoji: "🇭🇰"
    },
    {
        id: "HU",
        name: "Hungarian, Magyar",
        name1: "Hungary",
        emoji: "🇭🇺"
    },
    {
        id: "IS",
        name: "Icelandic",
        name1: "Iceland",
        emoji: "🇮🇸"
    },
    {
        id: "IN",
        name: "Indian",
        name1: "India",
        emoji: "🇮🇳"
    },
    {
        id: "ID",
        name: "Indonesian",
        name1: "Indonesia",
        emoji: "🇮🇩"
    },
    {
        id: "IR",
        name: "Iranian",
        name1: "Iran",
        emoji: "🇮🇷"
    },
    {
        id: "IQ",
        name: "Iraqi",
        name1: "Iraq",
        emoji: "🇮🇶"
    },
    {
        id: "IE",
        name: "Irish",
        name1: "Ireland",
        emoji: "🇮🇪"
    },
    {
        id: "IM",
        name: "Manx",
        name1: "Isle of Man",
        emoji: "🇮🇲"
    },
    {
        id: "IL",
        name: "Israeli",
        name1: "Israel",
        emoji: "🇮🇱"
    },
    {
        id: "IT",
        name: "Italian",
        name1: "Italy",
        emoji: "🇮🇹"
    },
    {
        id: "JM",
        name: "Jamaican",
        name1: "Jamaica",
        emoji: "🇯🇲"
    },
    {
        id: "SJ",
        name: "Jan Mayen",
        emoji: "🇸🇯"
    },
    {
        id: "JP",
        name: "Japanese",
        name1: "Japan",
        emoji: "🇯🇵"
    },
    {
        id: "JE",
        name: "Channel Island",
        name1: "Jersey",
        emoji: "🇯🇪"
    },
    {
        id: "JO",
        name: "Jordanian",
        name1: "Jordan",
        emoji: "🇯🇴"
    },
    {
        id: "KZ",
        name: "Kazakhstani",
        name1: "Kazakhstan",
        emoji: "🇰🇿"
    },
    {
        id: "KE",
        name: "Kenyan",
        name1: "Kenya",
        emoji: "🇰🇪"
    },
    {
        id: "KI",
        name: "I-Kiribati",
        name1: "Kiribati",
        emoji: "🇰🇮"
    },
    {
        id: "KW",
        name: "Kuwaiti",
        name1: "Kuwait",
        emoji: "🇰🇼"
    },
    {
        id: "KG",
        name: "Kyrgyz",
        name1: "Kyrgyzstan",
        emoji: "🇰🇬"
    },
    {
        id: "LA",
        name: "Lao, Laotian",
        name1: "Lao People's Democratic Republic",
        emoji: "🇱🇦"
    },
    {
        id: "LV",
        name: "Latvian",
        name1: "Latvia",
        emoji: "🇱🇻"
    },
    {
        id: "LB",
        name: "Lebanese",
        name1: "Lebanon",
        emoji: "🇱🇧"
    },
    {
        id: "LS",
        name: "Basotho",
        name1: "Lesotho",
        emoji: "🇱🇸"
    },
    {
        id: "LR",
        name: "Liberian",
        name1: "Liberia",
        emoji: "🇱🇷"
    },
    {
        id: "LY",
        name: "Libyan",
        name1: "Libya",
        emoji: "🇱🇾"
    },
    {
        id: "LI",
        name: "Liechtenstein",
        name1: "Liechtenstein",
        emoji: "🇱🇮"
    },
    {
        id: "LT",
        name: "Lithuanian",
        name1: "Lithuania",
        emoji: "🇱🇹"
    },
    {
        id: "LU",
        name: "Luxembourgish",
        name1: "Luxembourg",
        emoji: "🇱🇺"
    },
    {
        id: "MO",
        name: "Macau SAR China",
        name1: "Macanese",
        emoji: "🇲🇴"
    },
    {
        id: "MK",
        name: "North Macedonia",
        name1: "Macedonian",
        emoji: "🇲🇰"
    },
    {
        id: "MG",
        name: "Madagascar",
        name1: "Malagasy",
        emoji: "🇲🇬"
    },
    {
        id: "MW",
        name: "Malawi",
        name1: "Malawian",
        emoji: "🇲🇼"
    },
    {
        id: "MY",
        name: "Malaysia",
        name1: "Malaysian",
        emoji: "🇲🇾"
    },
    {
        id: "MV",
        name: "Maldives",
        name1: "Maldivian",
        emoji: "🇲🇻"
    },
    {
        id: "ML",
        name: "Malian",
        name1: "Mali",
        emoji: "🇲🇱"
    },
    {
        id: "MT",
        name: "Maltese",
        name1: "Malta",
        emoji: "🇲🇹"
    },
    {
        id: "MH",
        name: "Marshallese",
        name1: "Marshall Islands",
        emoji: "🇲🇭"
    },
    {
        id: "MQ",
        name: "Martiniquais",
        name1: "Martinique",
        emoji: "🇲🇶"
    },
    {
        id: "MR",
        name: "Mauritanian",
        name1: "Mauritania",
        emoji: "🇲🇷"
    },
    {
        id: "MU",
        name: "Mauritian",
        name1: "Mauritius",
        emoji: "🇲🇺"
    },
    {
        id: "YT",
        name: "Mahoran",
        name1: "Mayotte",
        emoji: "🇾🇹"
    },
    {
        id: "MX",
        name: "Mexican",
        name1: "Mexico",
        emoji: "🇲🇽"
    },
    {
        id: "FM",
        name: "Micronesian",
        name1: "Micronesia",
        emoji: "🇫🇲"
    },
    {
        id: "MD",
        name: "Moldovan",
        name1: "Moldova",
        emoji: "🇲🇩"
    },
    {
        id: "MC",
        name: "Monegasque",
        name1: "Monaco",
        emoji: "🇲🇨"
    },
    {
        id: "MN",
        name: "Mongolian",
        name1: "Mongolia",
        emoji: "🇲🇳"
    },
    {
        id: "ME",
        name: "Montenegrin",
        name1: "Montenegro",
        emoji: "🇲🇪"
    },
    {
        id: "MS",
        name: "Montserratian",
        name1: "Montserrat",
        emoji: "🇲🇸"
    },
    {
        id: "MA",
        name: "Moroccan",
        name1: "Morocco",
        emoji: "🇲🇦"
    },
    {
        id: "MZ",
        name: "Mozambican",
        name1: "Mozambique",
        emoji: "🇲🇿"
    },
    {
        id: "MM",
        name: "Burmese",
        name1: "Myanmar (Burma)",
        emoji: "🇲🇲"
    },
    {
        id: "NA",
        name: "Namibian",
        name1: "Namibia",
        emoji: "🇳🇦"
    },
    {
        id: "NR",
        name: "Nauruan",
        name1: "Nauru",
        emoji: "🇳🇷"
    },
    {
        id: "NP",
        name: "Nepali",
        name1: "Nepal",
        emoji: "🇳🇵"
    },
    {
        id: "NL",
        name: "Dutch",
        name1: "Netherlands",
        emoji: "🇳🇱"
    },
    {
        id: "NC",
        name: "New Caledonian",
        name1: "New Caledonia",
        emoji: "🇳🇨"
    },
    {
        id: "NZ",
        name: "New Zealand",
        name1: "New Zealand",
        emoji: "🇳🇿"
    },
    {
        id: "NI",
        name: "Nicaraguan",
        name1: "Nicaragua",
        emoji: "🇳🇮"
    },
    {
        id: "NE",
        name: "Nigerien",
        name1: "Niger",
        emoji: "🇳🇪"
    },
    {
        id: "NG",
        name: "Nigerian",
        name1: "Nigeria",
        emoji: "🇳🇬"
    },
    {
        id: "NU",
        name: "Niuean",
        name1: "Niue",
        emoji: "🇳🇺"
    },
    {
        id: "NF",
        name: "Norfolk Island",
        name1: "Norfolk Island",
        emoji: "🇳🇫"
    },
    {
        id: "KP",
        name: "North Korean",
        name1: "North Korea",
        emoji: "🇰🇵"
    },
    {
        id: "MP",
        name: "Northern Marianan",
        name1: "Northern Islands",
        emoji: "🇲🇵"
    },
    {
        id: "NO",
        name: "Norwegian",
        name1: "Norway",
        emoji: "🇳🇴"
    },
    {
        id: "OM",
        name: "Omani",
        name1: "Oman",
        emoji: "🇴🇲"
    },
    {
        id: "PK",
        name: "Pakistani",
        name1: "Pakistan",
        emoji: "🇵🇰"
    },
    {
        id: "PW",
        name: "Palauan",
        name1: "Palau",
        emoji: "🇵🇼"
    },
    {
        id: "PA",
        name: "Panamanian",
        name1: "Panama",
        emoji: "🇵🇦"
    },
    {
        id: "PG",
        name: "Papuan",
        name1: "Papua New Guinea",
        emoji: "🇵🇬"
    },
    {
        id: "PY",
        name: "Paraguayan",
        name1: "Paraguay",
        emoji: "🇵🇾"
    },
    {
        id: "PE",
        name: "Peruvian",
        name1: "Peru",
        emoji: "🇵🇪"
    },
    {
        id: "PH",
        name: "Philippine",
        name1: "Philippines",
        emoji: "🇵🇭"
    },
    {
        id: "PL",
        name: "Polish",
        name1: "Poland",
        emoji: "🇵🇱"
    },
    {
        id: "PT",
        name: "Portuguese",
        name1: "Portugal",
        emoji: "🇵🇹"
    },
    {
        id: "PR",
        name: "Puerto Rican",
        name1: "Puerto Rico",
        emoji: "🇵🇷"
    },
    {
        id: "QA",
        name: "Qatari",
        name1: "Qatar",
        emoji: "🇶🇦"
    },
    {
        id: "CG",
        name: "Republic of the Congo",
        emoji: "🇨🇬"
    },
    {
        id: "RE",
        name: "Reunionese",
        name1: "Réunion",
        emoji: "🇷🇪"
    },
    {
        id: "RO",
        name: "Romanian",
        name1: "Romania",
        emoji: "🇷🇴"
    },
    {
        id: "RW",
        name: "Rwandan",
        name1: "Rwanda",
        emoji: "🇷🇼"
    },
    {
        id: "SH",
        name: "Saint Helenian",
        name1: "St. Helena",
        emoji: "🇸🇭"
    },
    {
        id: "AC",
        name: "Ascension Island",
        emoji: "🇦🇨"
    },
    {
        id: "TA",
        name: "Tristan da Cunha",
        emoji: "🇹🇦"
    },
    {
        id: "LC",
        name: "Saint Lucian",
        name1: "St. Lucia",
        emoji: "🇱🇨"
    },
    {
        id: "KN",
        name: "Kittitian",
        name1: "St. Kitts & Nevis",
        emoji: "🇰🇳"
    },
    {
        id: "MF",
        name: "Saint-Martinoise",
        name1: "St. Martin",
        emoji: "🇲🇫"
    },
    {
        id: "BL",
        name: "St. Barthélemy",
        emoji: "🇧🇱"
    },
    {
        id: "PM",
        name: "Saint-Pierrais",
        name1: "St. Pierre & Miquelon",
        emoji: "🇵🇲"
    },
    {
        id: "VC",
        name: "Vincentian",
        name1: "St. Vincent & Grenadines",
        emoji: "🇻🇨"
    },
    {
        id: "WS",
        name: "Samoan",
        name1: "Samoa",
        emoji: "🇼🇸"
    },
    {
        id: "SM",
        name: "Sammarinese",
        name1: "San Marino",
        emoji: "🇸🇲"
    },
    {
        id: "ST",
        name: "Sao Tomean",
        name1: "São Tomé & Príncipe",
        emoji: "🇸🇹"
    },
    {
        id: "SA",
        name: "Saudi",
        name1: "Saudi Arabia",
        emoji: "🇸🇦"
    },
    {
        id: "SN",
        name: "Senegalese",
        name1: "Senegal",
        emoji: "🇸🇳"
    },
    {
        id: "RS",
        name: "Serbian",
        name1: "Serbia",
        emoji: "🇷🇸"
    },
    {
        id: "SC",
        name: "Seychellois",
        name1: "Seychelles",
        emoji: "🇸🇨"
    },
    {
        id: "SL",
        name: "Sierra Leonean",
        name1: "Sierra Leone",
        emoji: "🇸🇱"
    },
    {
        id: "SG",
        name: "Singaporean",
        name1: "Singapore",
        emoji: "🇸🇬"
    },
    {
        id: "SX",
        name: "Sint Maarten",
        name1: "Sint Maarten",
        emoji: "🇸🇽"
    },
    {
        id: "SK",
        name: "Slovak",
        name1: "Slovakia",
        emoji: "🇸🇰"
    },
    {
        id: "SI",
        name: "Slovenian",
        name1: "Slovenia",
        emoji: "🇸🇮"
    },
    {
        id: "SB",
        name: "Solomon Island",
        name1: "Solomon Islands",
        emoji: "🇸🇧"
    },
    {
        id: "SO",
        name: "Somali",
        name: "Somalia",
        emoji: "🇸🇴"
    },
    {
        id: "ZA",
        name: "South African",
        name1: "South Africa",
        emoji: "🇿🇦"
    },
    {
        id: "GS",
        name: "South Georgian & South Sandwich Islander",
        name1: "South Georgia & South Sandwich Islands",
        emoji: "🇬🇸"
    },
    {
        id: "SS",
        name: "South Sudan",
        name1: "South Sudanese",
        emoji: "🇸🇸"
    },
    {
        id: "ES",
        name: "Spanish",
        name1: "Spain",
        emoji: "🇪🇸"
    },
    {
        id: "LK",
        name: "Sri Lankan",
        name1: "Sri Lanka",
        emoji: "🇱🇰"
    },
    {
        id: "SD",
        name: "Sudanese",
        name1: "Sudan",
        emoji: "🇸🇩"
    },
    {
        id: "SR",
        name: "Surinamese",
        name1: "Suriname",
        emoji: "🇸🇷"
    },
    {
        id: "SJ",
        name: "Svalbard",
        name1: "Svalbard & Jan Mayen",
        emoji: "🇸🇯"
    },
    {
        id: "CH",
        name: "Swazi",
        name1: "Switzerland",
        emoji: "🇨🇭"
    },
    {
        id: "TJ",
        name: "Tajikistani",
        name1: "Tajikistan",
        emoji: "🇹🇯"
    },
    {
        id: "TZ",
        name: "Tanzanian",
        name1: "Tanzania",
        emoji: "🇹🇿"
    },
    {
        id: "TH",
        name: "Thai",
        name1: "Thailand",
        emoji: "🇹🇭"
    },
    {
        id: "TL",
        name: "Timorese",
        name1: "Timor-Leste",
        emoji: "🇹🇱"
    },
    {
        id: "TG",
        name: "Togolese",
        name1: "Togo",
        emoji: "🇹🇬"
    },
    {
        id: "TK",
        name: "Tokelauan",
        name1: "Tokelau",
        emoji: "🇹🇰"
    },
    {
        id: "TO",
        name: "Tongan",
        name1: "Tonga",
        emoji: "🇹🇴"
    },
    {
        id: "TT",
        name: "Trinidadian",
        name1: "Trinidad & Tobago",
        emoji: "🇹🇹"
    },
    {
        id: "TN",
        name: "Tunisian",
        name1: "Tunisia",
        emoji: "🇹🇳"
    },
    {
        id: "TR",
        name: "Turkish",
        name1: "Turkey",
        emoji: "🇹🇷"
    },
    {
        id: "TM",
        name: "Turkmen",
        name1: "Turkmenistan",
        emoji: "🇹🇲"
    },
    {
        id: "TC",
        name: "Turks and Caicos Island",
        name1: "Turks & Caicos Islands",
        emoji: "🇹🇨"
    },
    {
        id: "TV",
        name: "Tuvaluan",
        name1: "Tuvalu",
        emoji: "🇹🇻"
    },
    {
        id: "UG",
        name: "Ugandan",
        name1: "Uganda",
        emoji: "🇺🇬"
    },
    {
        id: "UA",
        name: "Ukrainian",
        name1: "Ukraine",
        emoji: "🇺🇦"
    },
    {
        id: "AE",
        name: "Emirati",
        name1: "United Arab Emirates",
        emoji: "🇦🇪"
    },
    {
        id: "VI",
        name: "American Virgin Islander",
        name1: "U.S. Virgin Islands",
        emoji: "🇻🇮"
    },
    {
        id: "UY",
        name: "Uruguayan",
        name1: "Uruguay",
        emoji: "🇺🇾"
    },
    {
        id: "UZ",
        name: "Uzbek",
        name1: "Uzbekistan",
        emoji: "🇺🇿"
    },
    {
        id: "VU",
        name: "Vanuatuan",
        name1: "Vanuatu",
        emoji: "🇻🇺"
    },
    {
        id: "VA",
        name: "Vatican",
        name1: "Vatican City",
        emoji: "🇻🇦"
    },
    {
        id: "VE",
        name: "Venezuelan",
        name1: "Venezuela",
        emoji: "🇻🇪"
    },
    {
        id: "VN",
        name: "Vietnamese",
        name1: "Vietnam",
        emoji: "🇻🇳"
    },
    {
        id: "EH",
        name: "Sahrawi",
        name1: "Western Sahara",
        emoji: "🇪🇭"
    },
    {
        id: "YE",
        name: "Yemeni",
        name1: "Yemen",
        emoji: "🇾🇪"
    },
    {
        id: "ZM",
        name: "Zambian",
        name1: "Zambia",
        emoji: "🇿🇲"
    },
    {
        id: "ZW",
        name: "Zimbabwean",
        name1: "Zimbabwe",
        emoji: "🇿🇼"
    },
    {
        id: "SZ",
        name: "Swazi",
        name1: "Swaziland",
        emoji: "🇸🇿"
    },
    {
        id: "WF",
        name: "Wallisian",
        name1: "Wallis & Futuna",
        emoji: "🇼🇫"
    },
    {
        id: "US",
        name: "American",
        name1: "United States",
        emoji: "🇺🇸"
    },
    {
        id: "PS",
        name: "Palestinians",
        name1: "Palestinian Territories",
        emoji: "🇵🇸"
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
