import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Select from 'react-select';

const rawData = [
  {
    'Product Code': 'BOWL',
    'Size': '12 INCH',
    '06-06-2025': 8000, '07-06-2025': 8000, '08-06-2025': 8000, '09-06-2025': 8000, '10-06-2025': 0,
    '11-06-2025': 8000, '12-06-2025': 8000, '13-06-2025': 7999, '14-06-2025': 8000, '15-06-2025': 8000,
    '16-06-2025': 8000, '17-06-2025': 0, '18-06-2025': 8000, '19-06-2025': 8000, '20-06-2025': 8000,
    '21-06-2025': 8000, '22-06-2025': 8000, '23-06-2025': 8000, '24-06-2025': 0, '25-06-2025': 10000,
    '26-06-2025': 10000, '27-06-2025': 10000, '28-06-2025': 10000, '29-06-2025': 10000, '30-06-2025': 10000,
    '01-07-2025': 0, '02-07-2025': 10000, '03-07-2025': 10000, '04-07-2025': 10000, '05-07-2025': 10000,
    '06-07-2025': 10000, '07-07-2025': 10000, '08-07-2025': 0, '09-07-2025': 10000, '10-07-2025': 10000,
    '11-07-2025': 10000, '12-07-2025': 10000, '13-07-2025': 10000, '14-07-2025': 10000, '15-07-2025': 0
  },
  {
    'Product Code': 'PLATE',
    'Size': '10 INCH',
    '06-06-2025': 10, '07-06-2025': 0, '08-06-2025': 15, '09-06-2025': 0, '10-06-2025': 0,
    '11-06-2025': 0, '12-06-2025': 0, '13-06-2025': 0, '14-06-2025': 0, '15-06-2025': 0,
    '16-06-2025': 0, '17-06-2025': 0, '18-06-2025': 0, '19-06-2025': 0, '20-06-2025': 0,
    '21-06-2025': 0, '22-06-2025': 0, '23-06-2025': 0, '24-06-2025': 0, '25-06-2025': 0,
    '26-06-2025': 0, '27-06-2025': 0, '28-06-2025': 0, '29-06-2025': 0, '30-06-2025': 0,
    '01-07-2025': 0, '02-07-2025': 0, '03-07-2025': 0, '04-07-2025': 0, '05-07-2025': 0,
    '06-07-2025': 1000, '07-07-2025': 0, '08-07-2025': 0, '09-07-2025': 0, '10-07-2025': 0,
    '11-07-2025': 0, '12-07-2025': 0, '13-07-2025': 0, '14-07-2025': 0, '15-07-2025': 0
  },
  {
    'Product Code': 'PLATE',
    'Size': '12 INCH',
    '06-06-2025': 0, '07-06-2025': 0, '08-06-2025': 0, '09-06-2025': 0, '10-06-2025': 0,
    '11-06-2025': 0, '12-06-2025': 0, '13-06-2025': 0, '14-06-2025': 0, '15-06-2025': 0,
    '16-06-2025': 0, '17-06-2025': 0, '18-06-2025': 0, '19-06-2025': 0, '20-06-2025': 0,
    '21-06-2025': 0, '22-06-2025': 0, '23-06-2025': 0, '24-06-2025': 50000, '25-06-2025': 50000,
    '26-06-2025': 50000, '27-06-2025': 50000, '28-06-2025': 49950, '29-06-2025': 47000, '30-06-2025': 0,
    '01-07-2025': 50000, '02-07-2025': 50000, '03-07-2025': 50000, '04-07-2025': 50000, '05-07-2025': 50000,
    '06-07-2025': 50000, '07-07-2025': 0, '08-07-2025': 50000, '09-07-2025': 50000, '10-07-2025': 50000,
    '11-07-2025': 50000, '12-07-2025': 50000, '13-07-2025': 0, '14-07-2025': 0, '15-07-2025': 0
  }
];

const allDates = [
  '06-06-2025', '07-06-2025', '08-06-2025', '09-06-2025', '10-06-2025',
  '11-06-2025', '12-06-2025', '13-06-2025', '14-06-2025', '15-06-2025',
  '16-06-2025', '17-06-2025', '18-06-2025', '19-06-2025', '20-06-2025',
  '21-06-2025', '22-06-2025', '23-06-2025', '24-06-2025', '25-06-2025',
  '26-06-2025', '27-06-2025', '28-06-2025', '29-06-2025', '30-06-2025',
  '01-07-2025', '02-07-2025', '03-07-2025', '04-07-2025', '05-07-2025',
  '06-07-2025', '07-07-2025', '08-07-2025', '09-07-2025', '10-07-2025',
  '11-07-2025', '12-07-2025', '13-07-2025', '14-07-2025', '15-07-2025'
];

// Static API-like data (replace rawData usage)
const staticApiData = [
  {
    "Product Code": "BOWL",
    "06-06-2025": 8000, "07-06-2025": 8000, "08-06-2025": 8000, "09-06-2025": 8000, "10-06-2025": 0, "11-06-2025": 8000, "12-06-2025": 8000, "13-06-2025": 7999, "14-06-2025": 8000, "15-06-2025": 8000, "16-06-2025": 8000, "17-06-2025": 0, "18-06-2025": 8000, "19-06-2025": 8000, "20-06-2025": 8000, "21-06-2025": 8000, "22-06-2025": 8000, "23-06-2025": 8000, "24-06-2025": 0, "25-06-2025": 10000, "26-06-2025": 10000, "27-06-2025": 10000, "28-06-2025": 10000, "29-06-2025": 10000, "30-06-2025": 10000, "01-07-2025": 0, "02-07-2025": 10000, "03-07-2025": 10000, "04-07-2025": 10000, "05-07-2025": 10000, "06-07-2025": 10000, "07-07-2025": 10000, "08-07-2025": 0, "09-07-2025": 10000, "10-07-2025": 10000, "11-07-2025": 10000, "12-07-2025": 10000, "13-07-2025": 10000, "14-07-2025": 10000, "15-07-2025": 0
  },
  {
    "Product Code": "PLATE",
    "06-06-2025": 8000, "07-06-2025": 8000, "08-06-2025": 8000, "09-06-2025": 8000, "10-06-2025": 0, "11-06-2025": 8000, "12-06-2025": 8000, "13-06-2025": 7999, "14-06-2025": 8000, "15-06-2025": 8000, "16-06-2025": 8000, "17-06-2025": 0, "18-06-2025": 8000, "19-06-2025": 8000, "20-06-2025": 8000, "21-06-2025": 8000, "22-06-2025": 8000, "23-06-2025": 8000, "24-06-2025": 0, "25-06-2025": 10000, "26-06-2025": 10000, "27-06-2025": 10000, "28-06-2025": 10000, "29-06-2025": 10000, "30-06-2025": 10000, "01-07-2025": 0, "02-07-2025": 10000, "03-07-2025": 10000, "04-07-2025": 10000, "05-07-2025": 10000, "06-07-2025": 10000, "07-07-2025": 10000, "08-07-2025": 0, "09-07-2025": 10000, "10-07-2025": 10000, "11-07-2025": 10000, "12-07-2025": 10000, "13-07-2025": 10000, "14-07-2025": 10000, "15-07-2025": 0
  },
  {
    "Product Code": "SPOON",
    "06-06-2025": 8000, "07-06-2025": 8000, "08-06-2025": 8000, "09-06-2025": 8000, "10-06-2025": 0, "11-06-2025": 8000, "12-06-2025": 8000, "13-06-2025": 7999, "14-06-2025": 8000, "15-06-2025": 8000, "16-06-2025": 8000, "17-06-2025": 0, "18-06-2025": 8000, "19-06-2025": 8000, "20-06-2025": 8000, "21-06-2025": 8000, "22-06-2025": 8000, "23-06-2025": 8000, "24-06-2025": 0, "25-06-2025": 10000, "26-06-2025": 10000, "27-06-2025": 10000, "28-06-2025": 10000, "29-06-2025": 10000, "30-06-2025": 10000, "01-07-2025": 0, "02-07-2025": 10000, "03-07-2025": 10000, "04-07-2025": 10000, "05-07-2025": 10000, "06-07-2025": 10000, "07-07-2025": 10000, "08-07-2025": 0, "09-07-2025": 10000, "10-07-2025": 10000, "11-07-2025": 10000, "12-07-2025": 10000, "13-07-2025": 10000, "14-07-2025": 10000, "15-07-2025": 0
  }
];

// Product+Size options from rawData
const productCodes = ['PLATE', 'BOWL', 'SPOON'];
const productOptions = productCodes.map(code => ({ value: code, label: code }));

const getSizeOptionsForProduct = (product) => {
  if (product === 'SPOON') return [];
  return Array.from(new Set(rawData.filter(row => row['Product Code'] === product).map(row => row['Size'])))
    .map(size => ({ value: size, label: size }));
};

const CapacityTable = () => {
  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const [selectedSizes, setSelectedSizes] = React.useState({});
  const [warning, setWarning] = useState("");

  // Build selected Product+Size combinations (only for Plate/Bowl)
  const selectedCombinations = [];
  selectedProducts.forEach(p => {
    if (p.value === 'SPOON') return;
    const sizes = selectedSizes[p.value] || [];
    sizes.forEach(s => {
      selectedCombinations.push({ product: p.value, size: s.value });
    });
  });

  // Calculate total selected combinations (Product+Size + API products)
  const selectedApiProducts = selectedProducts.filter(p => p.value === 'SPOON' || p.value === 'PLATE' || p.value === 'BOWL');
  const totalCombinations = selectedCombinations.length + selectedApiProducts.length;

  // Restrict to max 5 combinations (across both API and Product+Size)
  useEffect(() => {
    if (totalCombinations > 5) {
      setWarning("Sorry, you can't add more than five combinations.");
    } else {
      setWarning("");
    }
  }, [totalCombinations]);

  const canAddMore = totalCombinations < 5;

  // Merge: selected Product+Size + always-show API products (for selected products only)
  const mergedCombinations = [
    // Product+Size from selection (Plate/Bowl)
    ...rawData.filter(row =>
      selectedCombinations.some(
        comb => comb.product === row['Product Code'] && comb.size === row['Size']
      )
    ).map(row => ({
      key: row['Product Code'] + '||' + row['Size'],
      label: row['Product Code'] + ' - ' + row['Size'],
      getCapacity: date => row[date] || 0
    })),
    // Always-show API products for selected products (no size)
    ...staticApiData.filter(row => selectedProducts.some(p => p.value === row['Product Code'])).map(row => ({
      key: row['Product Code'],
      label: row['Product Code'],
      getCapacity: date => row[date] || 0
    }))
  ];

  // For each combination, build a map of date -> running sum capacity
  const adjustedCapacityMap = {};
  mergedCombinations.forEach(comb => {
    let prev = 0;
    adjustedCapacityMap[comb.key] = {};
    allDates.forEach(date => {
      let cap = comb.getCapacity(date);
      cap = cap + prev;
      adjustedCapacityMap[comb.key][date] = cap;
      prev = cap;
    });
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
        className="w-full max-w-7xl bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl border border-white/30 p-2 sm:p-8 flex flex-col gap-6"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-8 text-center tracking-tight drop-shadow animate-fade-in">
          Products Data
        </h2>
        {/* Warning message */}
        {warning && (
          <div className="w-full max-w-xl mx-auto mb-2 p-3 rounded-lg bg-red-100 border border-red-400 text-red-700 text-center font-semibold animate-pulse">
            {warning}
          </div>
        )}
        {/* Selection UI */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 justify-center w-full animate-fade-in">
          <div className="flex flex-col items-center min-w-[220px] w-full">
            <label className="font-semibold text-gray-700 mb-2">Product Code</label>
            <Select
              isMulti
              options={productOptions}
              value={selectedProducts}
              onChange={opts => {
                // Prevent adding more than 5 total
                const newProducts = opts || [];
                const newApiCount = newProducts.filter(p => p.value === 'SPOON' || p.value === 'PLATE' || p.value === 'BOWL').length;
                if (selectedCombinations.length + newApiCount > 5) {
                  setWarning("Sorry, you can't add more than five combinations.");
                  return;
                }
                setWarning("");
                setSelectedProducts(newProducts);
              }}
              className="w-full min-w-[200px] text-base"
              classNamePrefix="react-select"
              placeholder="Select Product(s)"
              isDisabled={!canAddMore && selectedProducts.every(p => p.value === 'SPOON')}
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderRadius: '0.75rem',
                  borderColor: state.isFocused ? '#7c3aed' : '#cbd5e1',
                  boxShadow: state.isFocused ? '0 0 0 2px #a5b4fc' : '',
                  minHeight: '44px',
                  fontSize: '1rem',
                  background: 'rgba(255,255,255,0.85)',
                  transition: 'border-color 0.2s',
                }),
                option: (base, state) => ({
                  ...base,
                  background: state.isSelected
                    ? 'linear-gradient(90deg,#6366f1,#a21caf)'
                    : state.isFocused
                    ? 'rgba(139,92,246,0.1)'
                    : 'white',
                  color: state.isSelected ? 'white' : '#312e81',
                  fontWeight: state.isSelected ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }),
                multiValue: base => ({
                  ...base,
                  background: 'linear-gradient(90deg,#a5b4fc,#fbc2eb)',
                  color: '#312e81',
                  fontWeight: 600,
                }),
                multiValueLabel: base => ({
                  ...base,
                  color: '#312e81',
                }),
                multiValueRemove: base => ({
                  ...base,
                  color: '#a21caf',
                  ':hover': { background: '#a21caf', color: 'white' },
                }),
              }}
            />
          </div>
          <div className="flex flex-wrap gap-6 w-full justify-center mt-2 sm:mt-0">
            {selectedProducts.filter(p => p.value !== 'SPOON').map(product => (
              <div key={product.value} className="flex flex-col items-center min-w-[180px]">
                <label className="font-semibold text-gray-700 mb-2">{product.label} Size</label>
                <Select
                  isMulti
                  options={getSizeOptionsForProduct(product.value)}
                  value={selectedSizes[product.value] || []}
                  onChange={opts => {
                    // Prevent adding more than 5 total
                    const newSizes = opts || [];
                    const otherCombinations = selectedCombinations.filter(
                      comb => comb.product !== product.value
                    );
                    const apiCount = selectedApiProducts.length;
                    if (otherCombinations.length + newSizes.length + apiCount > 5) {
                      setWarning("Sorry, you can't add more than five combinations.");
                      return;
                    }
                    setWarning("");
                    setSelectedSizes(prev => ({ ...prev, [product.value]: newSizes }));
                  }}
                  className="w-full min-w-[160px] text-base"
                  classNamePrefix="react-select"
                  placeholder={`Select Size(s) for ${product.label}`}
                  isDisabled={!canAddMore && (selectedSizes[product.value]?.length || 0) === 0}
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      borderRadius: '0.75rem',
                      borderColor: state.isFocused ? '#7c3aed' : '#cbd5e1',
                      boxShadow: state.isFocused ? '0 0 0 2px #a5b4fc' : '',
                      minHeight: '44px',
                      fontSize: '1rem',
                      background: 'rgba(255,255,255,0.85)',
                      transition: 'border-color 0.2s',
                    }),
                    option: (base, state) => ({
                      ...base,
                      background: state.isSelected
                        ? 'linear-gradient(90deg,#6366f1,#a21caf)'
                        : state.isFocused
                        ? 'rgba(139,92,246,0.1)'
                        : 'white',
                      color: state.isSelected ? 'white' : '#312e81',
                      fontWeight: state.isSelected ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }),
                    multiValue: base => ({
                      ...base,
                      background: 'linear-gradient(90deg,#a5b4fc,#fbc2eb)',
                      color: '#312e81',
                      fontWeight: 600,
                    }),
                    multiValueLabel: base => ({
                      ...base,
                      color: '#312e81',
                    }),
                    multiValueRemove: base => ({
                      ...base,
                      color: '#a21caf',
                      ':hover': { background: '#a21caf', color: 'white' },
                    }),
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Data Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 animate-fade-in">
          {allDates.map(date => {
            // API data (Product Code only)
            const apiCombos = staticApiData
              .filter(row => selectedProducts.some(p => p.value === row['Product Code']))
              .map(row => ({
                label: row['Product Code'],
                capacity: adjustedCapacityMap[row['Product Code']][date]
              }))
              .sort((a, b) => a.capacity - b.capacity);
            // Product+Size data (user selection)
            const comboCombos = rawData
              .filter(row =>
                selectedCombinations.some(
                  comb => comb.product === row['Product Code'] && comb.size === row['Size']
                )
              )
              .map(row => ({
                label: row['Product Code'] + ' - ' + row['Size'],
                capacity: adjustedCapacityMap[row['Product Code'] + '||' + row['Size']][date]
              }))
              .sort((a, b) => a.capacity - b.capacity);
            return (
              <motion.div
                key={date}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-l from-indigo-200 via-purple-100 to-purple-200 rounded-xl shadow-lg p-4 flex flex-col border border-[#25252B] hover:bg-indigo-200 hover:shadow-2xl transition-all duration-200"
              >
                <div className="font-bold text-indigo-700 text-base mb-2 text-center tracking-wide drop-shadow">
                  {date}
                </div>
                {/* API Data Section */}
                <div className="mb-2">
                  {/* <div className="text-xs font-bold text-indigo-900 mb-1 uppercase tracking-wider">API Data</div> */}
                  <div className="flex flex-col gap-2">
                    {apiCombos.map(({ label, capacity }) => (
                      <motion.div
                        key={label}
                        whileHover={{ scale: 1.04, backgroundColor: '#ede9fe' }}
                        className="flex flex-col items-center bg-white rounded-lg p-2 shadow-sm transition-all duration-200 cursor-pointer group"
                      >
                        <div className="text-gray-700 text-xs font-semibold group-hover:text-indigo-700 transition-colors duration-200">
                          {label}
                        </div>
                        <div className={`text-lg font-bold transition-colors duration-200 ${capacity === 0 ? 'text-red-600 group-hover:text-red-700' : 'text-green-900 group-hover:text-indigo-900'}`}>{capacity}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                {/* Separator */}
                <div className="my-2 border-t border-dashed border-[#25252B]" />
                {/* Product+Size Data Section */}
                <div>
                  {/* <div className="text-xs font-bold text-indigo-900 mb-1 uppercase tracking-wider">Product+Size Data</div> */}
                  <div className="flex flex-col gap-2">
                    {comboCombos.map(({ label, capacity }) => (
                      <motion.div
                        key={label}
                        whileHover={{ scale: 1.04, backgroundColor: '#ede9fe' }}
                        className="flex flex-col items-center bg-white rounded-lg p-2 shadow-sm transition-all duration-200 cursor-pointer group"
                      >
                        <div className="text-gray-700 text-xs font-semibold group-hover:text-indigo-700 transition-colors duration-200">
                          {label}
                        </div>
                        <div className={`text-lg font-bold transition-colors duration-200 ${capacity === 0 ? 'text-red-600 group-hover:text-red-700' : 'text-green-900 group-hover:text-indigo-900'}`}>{capacity}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default CapacityTable;