// setup countries constants
const COUNTRIES = {
	AF: {
		countryCode: 'AF',
		country: 'Afghanistan'
	},
	AX: {
		countryCode: 'AX',
		country: 'Åland Islands'
	},
	AL: {
		countryCode: 'AL',
		country: 'Albania'
	},
	DZ: {
		countryCode: 'DZ',
		country: 'Algeria'
	},
	AS: {
		countryCode: 'AS',
		country: 'American Samoa'
	},
	AD: {
		countryCode: 'AD',
		country: 'Andorra'
	},
	AO: {
		countryCode: 'AO',
		country: 'Angola'
	},
	AI: {
		countryCode: 'AI',
		country: 'Anguilla'
	},
	AG: {
		countryCode: 'AG',
		country: 'Antigua and Barbuda'
	},
	AR: {
		countryCode: 'AR',
		country: 'Argentina'
	},
	AM: {
		countryCode: 'AM',
		country: 'Armenia'
	},
	AW: {
		countryCode: 'AW',
		country: 'Aruba'
	},
	AU: {
		countryCode: 'AU',
		country: 'Australia'
	},
	AT: {
		countryCode: 'AT',
		country: 'Austria'
	},
	AZ: {
		countryCode: 'AZ',
		country: 'Azerbaijan'
	},
	BS: {
		countryCode: 'BS',
		country: 'Bahamas'
	},
	BH: {
		countryCode: 'BH',
		country: 'Bahrain'
	},
	BD: {
		countryCode: 'BD',
		country: 'Bangladesh'
	},
	BB: {
		countryCode: 'BB',
		country: 'Barbados'
	},
	BY: {
		countryCode: 'BY',
		country: 'Belarus'
	},
	BE: {
		countryCode: 'BE',
		country: 'Belgium'
	},
	BZ: {
		countryCode: 'BZ',
		country: 'Belize'
	},
	BJ: {
		countryCode: 'BJ',
		country: 'Benin'
	},
	BM: {
		countryCode: 'BM',
		country: 'Bermuda'
	},
	BT: {
		countryCode: 'BT',
		country: 'Bhutan'
	},
	BO: {
		countryCode: 'BO',
		country: 'Bolivia'
	},
	BA: {
		countryCode: 'BA',
		country: 'Bosnia and Herzegovina'
	},
	BW: {
		countryCode: 'BW',
		country: 'Botswana'
	},
	BR: {
		countryCode: 'BR',
		country: 'Brazil'
	},
	IO: {
		countryCode: 'IO',
		country: 'British Indian Ocean Territory'
	},
	VG: {
		countryCode: 'VG',
		country: 'British Virgin Islands'
	},
	BN: {
		countryCode: 'BN',
		country: 'Brunei'
	},
	BG: {
		countryCode: 'BG',
		country: 'Bulgaria'
	},
	BF: {
		countryCode: 'BF',
		country: 'Burkina Faso'
	},
	BI: {
		countryCode: 'BI',
		country: 'Burundi'
	},
	KH: {
		countryCode: 'KH',
		country: 'Cambodia'
	},
	CM: {
		countryCode: 'CM',
		country: 'Cameroon'
	},
	CA: {
		countryCode: 'CA',
		country: 'Canada'
	},
	CV: {
		countryCode: 'CV',
		country: 'Cape Verde'
	},
	BQ: {
		countryCode: 'BQ',
		country: 'Caribbean Netherlands'
	},
	KY: {
		countryCode: 'KY',
		country: 'Cayman Islands'
	},
	CF: {
		countryCode: 'CF',
		country: 'Central African Republic'
	},
	TD: {
		countryCode: 'TD',
		country: 'Chad'
	},
	CL: {
		countryCode: 'CL',
		country: 'Chile'
	},
	CN: {
		countryCode: 'CN',
		country: 'China'
	},
	CX: {
		countryCode: 'CX',
		country: 'Christmas Island'
	},
	CC: {
		countryCode: 'CC',
		country: 'Cocos [Keeling] Islands'
	},
	CO: {
		countryCode: 'CO',
		country: 'Colombia'
	},
	KM: {
		countryCode: 'KM',
		country: 'Comoros'
	},
	CD: {
		countryCode: 'CD',
		country: 'Democratic Republic Congo'
	},
	CG: {
		countryCode: 'CG',
		country: 'Republic of Congo'
	},
	CK: {
		countryCode: 'CK',
		country: 'Cook Islands'
	},
	CR: {
		countryCode: 'CR',
		country: 'Costa Rica'
	},
	CI: {
		countryCode: 'CI',
		country: "Côte d'Ivoire"
	},
	HR: {
		countryCode: 'HR',
		country: 'Croatia'
	},
	CU: {
		countryCode: 'CU',
		country: 'Cuba'
	},
	CW: {
		countryCode: 'CW',
		country: 'Curaçao'
	},
	CY: {
		countryCode: 'CY',
		country: 'Cyprus'
	},
	CZ: {
		countryCode: 'CZ',
		country: 'Czech Republic'
	},
	DK: {
		countryCode: 'DK',
		country: 'Denmark'
	},
	DJ: {
		countryCode: 'DJ',
		country: 'Djibouti'
	},
	DM: {
		countryCode: 'DM',
		country: 'Dominica'
	},
	DO: {
		countryCode: 'DO',
		country: 'Dominican Republic'
	},
	TL: {
		countryCode: 'TL',
		country: 'East Timor'
	},
	EC: {
		countryCode: 'EC',
		country: 'Ecuador'
	},
	EG: {
		countryCode: 'EG',
		country: 'Egypt'
	},
	SV: {
		countryCode: 'SV',
		country: 'El Salvador'
	},
	GQ: {
		countryCode: 'GQ',
		country: 'Equatorial Guinea'
	},
	ER: {
		countryCode: 'ER',
		country: 'Eritrea'
	},
	EE: {
		countryCode: 'EE',
		country: 'Estonia'
	},
	ET: {
		countryCode: 'ET',
		country: 'Ethiopia'
	},
	FK: {
		countryCode: 'FK',
		country: 'Falkland Islands [Islas Malvinas]'
	},
	FO: {
		countryCode: 'FO',
		country: 'Faroe Islands'
	},
	FJ: {
		countryCode: 'FJ',
		country: 'Fiji'
	},
	FI: {
		countryCode: 'FI',
		country: 'Finland'
	},
	FR: {
		countryCode: 'FR',
		country: 'France'
	},
	GF: {
		countryCode: 'GF',
		country: 'French Guiana'
	},
	PF: {
		countryCode: 'PF',
		country: 'French Polynesia'
	},
	GA: {
		countryCode: 'GA',
		country: 'Gabon'
	},
	GM: {
		countryCode: 'GM',
		country: 'Gambia'
	},
	GE: {
		countryCode: 'GE',
		country: 'Georgia'
	},
	DE: {
		countryCode: 'DE',
		country: 'Germany'
	},
	GH: {
		countryCode: 'GH',
		country: 'Ghana'
	},
	GI: {
		countryCode: 'GI',
		country: 'Gibraltar'
	},
	GR: {
		countryCode: 'GR',
		country: 'Greece'
	},
	GL: {
		countryCode: 'GL',
		country: 'Greenland'
	},
	GD: {
		countryCode: 'GD',
		country: 'Grenada'
	},
	GP: {
		countryCode: 'GP',
		country: 'Guadeloupe'
	},
	GU: {
		countryCode: 'GU',
		country: 'Guam'
	},
	GT: {
		countryCode: 'GT',
		country: 'Guatemala'
	},
	GG: {
		countryCode: 'GG',
		country: 'Guernsey'
	},
	GN: {
		countryCode: 'GN',
		country: 'Guinea Conakry'
	},
	GW: {
		countryCode: 'GW',
		country: 'Guinea-Bissau'
	},
	GY: {
		countryCode: 'GY',
		country: 'Guyana'
	},
	HT: {
		countryCode: 'HT',
		country: 'Haiti'
	},
	HM: {
		countryCode: 'HM',
		country: 'Heard Island and McDonald Islands'
	},
	HN: {
		countryCode: 'HN',
		country: 'Honduras'
	},
	HK: {
		countryCode: 'HK',
		country: 'Hong Kong'
	},
	HU: {
		countryCode: 'HU',
		country: 'Hungary'
	},
	IS: {
		countryCode: 'IS',
		country: 'Iceland'
	},
	IN: {
		countryCode: 'IN',
		country: 'India'
	},
	ID: {
		countryCode: 'ID',
		country: 'Indonesia'
	},
	IR: {
		countryCode: 'IR',
		country: 'Iran'
	},
	IQ: {
		countryCode: 'IQ',
		country: 'Iraq'
	},
	IE: {
		countryCode: 'IE',
		country: 'Ireland'
	},
	IM: {
		countryCode: 'IM',
		country: 'Isle of Man'
	},
	IL: {
		countryCode: 'IL',
		country: 'Israel'
	},
	IT: {
		countryCode: 'IT',
		country: 'Italy'
	},
	JM: {
		countryCode: 'JM',
		country: 'Jamaica'
	},
	JP: {
		countryCode: 'JP',
		country: 'Japan'
	},
	JE: {
		countryCode: 'JE',
		country: 'Jersey'
	},
	JO: {
		countryCode: 'JO',
		country: 'Jordan'
	},
	KZ: {
		countryCode: 'KZ',
		country: 'Kazakhstan'
	},
	KE: {
		countryCode: 'KE',
		country: 'Kenya'
	},
	KI: {
		countryCode: 'KI',
		country: 'Kiribati'
	},
	KW: {
		countryCode: 'KW',
		country: 'Kuwait'
	},
	KG: {
		countryCode: 'KG',
		country: 'Kyrgyzstan'
	},
	LA: {
		countryCode: 'LA',
		country: 'Laos'
	},
	LV: {
		countryCode: 'LV',
		country: 'Latvia'
	},
	LB: {
		countryCode: 'LB',
		country: 'Lebanon'
	},
	LS: {
		countryCode: 'LS',
		country: 'Lesotho'
	},
	LR: {
		countryCode: 'LR',
		country: 'Liberia'
	},
	LY: {
		countryCode: 'LY',
		country: 'Libya'
	},
	LI: {
		countryCode: 'LI',
		country: 'Liechtenstein'
	},
	LT: {
		countryCode: 'LT',
		country: 'Lithuania'
	},
	LU: {
		countryCode: 'LU',
		country: 'Luxembourg'
	},
	MO: {
		countryCode: 'MO',
		country: 'Macau'
	},
	MK: {
		countryCode: 'MK',
		country: 'Macedonia'
	},
	MG: {
		countryCode: 'MG',
		country: 'Madagascar'
	},
	MW: {
		countryCode: 'MW',
		country: 'Malawi'
	},
	MY: {
		countryCode: 'MY',
		country: 'Malaysia'
	},
	MV: {
		countryCode: 'MV',
		country: 'Maldives'
	},
	ML: {
		countryCode: 'ML',
		country: 'Mali'
	},
	MT: {
		countryCode: 'MT',
		country: 'Malta'
	},
	MH: {
		countryCode: 'MH',
		country: 'Marshall Islands'
	},
	MQ: {
		countryCode: 'MQ',
		country: 'Martinique'
	},
	MR: {
		countryCode: 'MR',
		country: 'Mauritania'
	},
	MU: {
		countryCode: 'MU',
		country: 'Mauritius'
	},
	YT: {
		countryCode: 'YT',
		country: 'Mayotte'
	},
	MX: {
		countryCode: 'MX',
		country: 'Mexico'
	},
	FM: {
		countryCode: 'FM',
		country: 'Micronesia'
	},
	MD: {
		countryCode: 'MD',
		country: 'Moldova'
	},
	MC: {
		countryCode: 'MC',
		country: 'Monaco'
	},
	MN: {
		countryCode: 'MN',
		country: 'Mongolia'
	},
	ME: {
		countryCode: 'ME',
		country: 'Montenegro'
	},
	MS: {
		countryCode: 'MS',
		country: 'Montserrat'
	},
	MA: {
		countryCode: 'MA',
		country: 'Morocco'
	},
	MZ: {
		countryCode: 'MZ',
		country: 'Mozambique'
	},
	MM: {
		countryCode: 'MM',
		country: 'Myanmar [Burma]'
	},
	NA: {
		countryCode: 'NA',
		country: 'Namibia'
	},
	NR: {
		countryCode: 'NR',
		country: 'Nauru'
	},
	NP: {
		countryCode: 'NP',
		country: 'Nepal'
	},
	NL: {
		countryCode: 'NL',
		country: 'Netherlands'
	},
	NC: {
		countryCode: 'NC',
		country: 'New Caledonia'
	},
	NZ: {
		countryCode: 'NZ',
		country: 'New Zealand'
	},
	NI: {
		countryCode: 'NI',
		country: 'Nicaragua'
	},
	NE: {
		countryCode: 'NE',
		country: 'Niger'
	},
	NG: {
		countryCode: 'NG',
		country: 'Nigeria'
	},
	NU: {
		countryCode: 'NU',
		country: 'Niue'
	},
	NF: {
		countryCode: 'NF',
		country: 'Norfolk Island'
	},
	KP: {
		countryCode: 'KP',
		country: 'North Korea'
	},
	MP: {
		countryCode: 'MP',
		country: 'Northern Mariana Islands'
	},
	NO: {
		countryCode: 'NO',
		country: 'Norway'
	},
	OM: {
		countryCode: 'OM',
		country: 'Oman'
	},
	PK: {
		countryCode: 'PK',
		country: 'Pakistan'
	},
	PW: {
		countryCode: 'PW',
		country: 'Palau'
	},
	PS: {
		countryCode: 'PS',
		country: 'Palestinian Territories'
	},
	PA: {
		countryCode: 'PA',
		country: 'Panama'
	},
	PG: {
		countryCode: 'PG',
		country: 'Papua New Guinea'
	},
	PY: {
		countryCode: 'PY',
		country: 'Paraguay'
	},
	PE: {
		countryCode: 'PE',
		country: 'Peru'
	},
	PH: {
		countryCode: 'PH',
		country: 'Philippines'
	},
	PL: {
		countryCode: 'PL',
		country: 'Poland'
	},
	PT: {
		countryCode: 'PT',
		country: 'Portugal'
	},
	PR: {
		countryCode: 'PR',
		country: 'Puerto Rico'
	},
	QA: {
		countryCode: 'QA',
		country: 'Qatar'
	},
	RE: {
		countryCode: 'RE',
		country: 'Réunion'
	},
	RO: {
		countryCode: 'RO',
		country: 'Romania'
	},
	RU: {
		countryCode: 'RU',
		country: 'Russia'
	},
	RW: {
		countryCode: 'RW',
		country: 'Rwanda'
	},
	BL: {
		countryCode: 'BL',
		country: 'Saint Barthélemy'
	},
	SH: {
		countryCode: 'SH',
		country: 'Saint Helena'
	},
	KN: {
		countryCode: 'KN',
		country: 'St. Kitts'
	},
	LC: {
		countryCode: 'LC',
		country: 'St. Lucia'
	},
	MF: {
		countryCode: 'MF',
		country: 'Saint Martin'
	},
	PM: {
		countryCode: 'PM',
		country: 'Saint Pierre and Miquelon'
	},
	VC: {
		countryCode: 'VC',
		country: 'St. Vincent'
	},
	WS: {
		countryCode: 'WS',
		country: 'Samoa'
	},
	SM: {
		countryCode: 'SM',
		country: 'San Marino'
	},
	ST: {
		countryCode: 'ST',
		country: 'São Tomé and Príncipe'
	},
	SA: {
		countryCode: 'SA',
		country: 'Saudi Arabia'
	},
	SN: {
		countryCode: 'SN',
		country: 'Senegal'
	},
	RS: {
		countryCode: 'RS',
		country: 'Serbia'
	},
	SC: {
		countryCode: 'SC',
		country: 'Seychelles'
	},
	SL: {
		countryCode: 'SL',
		country: 'Sierra Leone'
	},
	SG: {
		countryCode: 'SG',
		country: 'Singapore'
	},
	SX: {
		countryCode: 'SX',
		country: 'Sint Maarten'
	},
	SK: {
		countryCode: 'SK',
		country: 'Slovakia'
	},
	SI: {
		countryCode: 'SI',
		country: 'Slovenia'
	},
	SB: {
		countryCode: 'SB',
		country: 'Solomon Islands'
	},
	SO: {
		countryCode: 'SO',
		country: 'Somalia'
	},
	ZA: {
		countryCode: 'ZA',
		country: 'South Africa'
	},
	GS: {
		countryCode: 'GS',
		country: 'South Georgia and the South Sandwich Islands'
	},
	KR: {
		countryCode: 'KR',
		country: 'South Korea'
	},
	SS: {
		countryCode: 'SS',
		country: 'South Sudan'
	},
	ES: {
		countryCode: 'ES',
		country: 'Spain'
	},
	LK: {
		countryCode: 'LK',
		country: 'Sri Lanka'
	},
	SD: {
		countryCode: 'SD',
		country: 'Sudan'
	},
	SR: {
		countryCode: 'SR',
		country: 'Suriname'
	},
	SJ: {
		countryCode: 'SJ',
		country: 'Svalbard and Jan Mayen'
	},
	SZ: {
		countryCode: 'SZ',
		country: 'Swaziland'
	},
	SE: {
		countryCode: 'SE',
		country: 'Sweden'
	},
	CH: {
		countryCode: 'CH',
		country: 'Switzerland'
	},
	SY: {
		countryCode: 'SY',
		country: 'Syria'
	},
	TW: {
		countryCode: 'TW',
		country: 'Taiwan'
	},
	TJ: {
		countryCode: 'TJ',
		country: 'Tajikistan'
	},
	TZ: {
		countryCode: 'TZ',
		country: 'Tanzania'
	},
	TH: {
		countryCode: 'TH',
		country: 'Thailand'
	},
	TG: {
		countryCode: 'TG',
		country: 'Togo'
	},
	TK: {
		countryCode: 'TK',
		country: 'Tokelau'
	},
	TO: {
		countryCode: 'TO',
		country: 'Tonga'
	},
	TT: {
		countryCode: 'TT',
		country: 'Trinidad/Tobago'
	},
	TN: {
		countryCode: 'TN',
		country: 'Tunisia'
	},
	TR: {
		countryCode: 'TR',
		country: 'Turkey'
	},
	TM: {
		countryCode: 'TM',
		country: 'Turkmenistan'
	},
	TC: {
		countryCode: 'TC',
		country: 'Turks and Caicos Islands'
	},
	TV: {
		countryCode: 'TV',
		country: 'Tuvalu'
	},
	VI: {
		countryCode: 'VI',
		country: 'U.S. Virgin Islands'
	},
	UG: {
		countryCode: 'UG',
		country: 'Uganda'
	},
	UA: {
		countryCode: 'UA',
		country: 'Ukraine'
	},
	AE: {
		countryCode: 'AE',
		country: 'United Arab Emirates'
	},
	GB: {
		countryCode: 'GB',
		country: 'United Kingdom'
	},
	US: {
		countryCode: 'US',
		country: 'United States'
	},
	UY: {
		countryCode: 'UY',
		country: 'Uruguay'
	},
	UZ: {
		countryCode: 'UZ',
		country: 'Uzbekistan'
	},
	VU: {
		countryCode: 'VU',
		country: 'Vanuatu'
	},
	VA: {
		countryCode: 'VA',
		country: 'Vatican City'
	},
	VE: {
		countryCode: 'VE',
		country: 'Venezuela'
	},
	VN: {
		countryCode: 'VN',
		country: 'Vietnam'
	},
	WF: {
		countryCode: 'WF',
		country: 'Wallis and Futuna'
	},
	EH: {
		countryCode: 'EH',
		country: 'Western Sahara'
	},
	YE: {
		countryCode: 'YE',
		country: 'Yemen'
	},
	ZM: {
		countryCode: 'ZM',
		country: 'Zambia'
	},
	ZW: {
		countryCode: 'ZW',
		country: 'Zimbabwe'
	}
};

export default COUNTRIES;
