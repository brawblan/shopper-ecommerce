export const states = [
  { state: 'List of States', selected: true, disabled: true },
  { state: 'Alabama', stateAbbreviation: 'AL' },
  { state: 'Alaska', stateAbbreviation: 'AK' },
  { state: 'Arizona', stateAbbreviation: 'AZ' },
  { state: 'Arkansas', stateAbbreviation: 'AR' },
  { state: 'California', stateAbbreviation: 'CA' },
  { state: 'Colorado', stateAbbreviation: 'CO' },
  { state: 'Connecticut', stateAbbreviation: 'CT' },
  { state: 'Delaware', stateAbbreviation: 'DE' },
  { state: 'District Of Columbia', stateAbbreviation: 'DC' },
  { state: 'Florida', stateAbbreviation: 'FL' },
  { state: 'Georgia', stateAbbreviation: 'GA' },
  { state: 'Hawaii', stateAbbreviation: 'HI' },
  { state: 'Idaho', stateAbbreviation: 'ID' },
  { state: 'Illinois', stateAbbreviation: 'IL' },
  { state: 'Indiana', stateAbbreviation: 'IN' },
  { state: 'Iowa', stateAbbreviation: 'IA' },
  { state: 'Kansas', stateAbbreviation: 'KS' },
  { state: 'Kentucky', stateAbbreviation: 'KY' },
  { state: 'Louisiana', stateAbbreviation: 'LA' },
  { state: 'Maine', stateAbbreviation: 'ME' },
  { state: 'Maryland', stateAbbreviation: 'MD' },
  { state: 'Massachusetts', stateAbbreviation: 'MA' },
  { state: 'Michigan', stateAbbreviation: 'MI' },
  { state: 'Minnesota', stateAbbreviation: 'MN' },
  { state: 'Mississippi', stateAbbreviation: 'MS' },
  { state: 'Missouri', stateAbbreviation: 'MO' },
  { state: 'Montana', stateAbbreviation: 'MT' },
  { state: 'Nebraska', stateAbbreviation: 'NE' },
  { state: 'Nevada', stateAbbreviation: 'NV' },
  { state: 'New Hampshire', stateAbbreviation: 'NH' },
  { state: 'New Jersey', stateAbbreviation: 'NJ' },
  { state: 'New Mexico', stateAbbreviation: 'NM' },
  { state: 'New York', stateAbbreviation: 'NY' },
  { state: 'North Carolina', stateAbbreviation: 'NC' },
  { state: 'North Dakota', stateAbbreviation: 'ND' },
  { state: 'Ohio', stateAbbreviation: 'OH' },
  { state: 'Oklahoma', stateAbbreviation: 'OK' },
  { state: 'Oregon', stateAbbreviation: 'OR' },
  { state: 'Pennsylvania', stateAbbreviation: 'PA' },
  { state: 'Rhode Island', stateAbbreviation: 'RI' },
  { state: 'South Carolina', stateAbbreviation: 'SC' },
  { state: 'South Dakota', stateAbbreviation: 'SD' },
  { state: 'Tennessee', stateAbbreviation: 'TN' },
  { state: 'Texas', stateAbbreviation: 'TX' },
  { state: 'Utah', stateAbbreviation: 'UT' },
  { state: 'Vermont', stateAbbreviation: 'VT' },
  { state: 'Virginia', stateAbbreviation: 'VA' },
  { state: 'Washington', stateAbbreviation: 'WA' },
  { state: 'West Virginia', stateAbbreviation: 'WV' },
  { state: 'Wisconsin', stateAbbreviation: 'WI' },
  { state: 'Wyoming', stateAbbreviation: 'WY' },
]

export const countries = [
  { country: 'List of Countries', selected: true, disabled: true },
  { country: 'United States of America', selected: false, disabled: false },
  { country: 'Canada', selected: false, disabled: false },
  { country: 'Mexico', selected: false, disabled: false },
]

export const expMonth = ['Month', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const year = new Date().getFullYear()
let yearPlus = year
export const expYear = ['Year']
while (yearPlus <= year + 5) {
  expYear.push(yearPlus)
  yearPlus++
}
