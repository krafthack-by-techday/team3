import React, { useState } from 'react';
import { Box, Container, Text } from '@mantine/core';

function App() {
  const [prisModel, setPrisModel] = useState('');
  const [priceArea, setPriceArea] = useState('');
  const [consumption, setConsumtipn] = useState(0);
  const prisModelOptions = [
    { value: 'Norgespris', label: 'Norges pris' },
    { value: 'Strømstøtte', label: 'Strømstøtte' },
    { value: 'Spotpris', label: 'Spotpris' },
  ];
  const priceAreaOptions = [
    { value: 'N01', label: 'N01 - Østlandet' },
    { value: 'N02', label: 'N02 - Sørlandet' },
    { value: 'N03', label: 'N03 - Midt Norge' },
    { value: 'N04', label: 'N04 - Nord Norge' },
    { value: 'N05', label: 'N05 - Vestlandet' },
  ]

  const onChangePriceAreaChange = (value: string) => {
    setPriceArea(value);
  };

  const onChangePriceModelChange = (value: string) => {
    setPrisModel(value);
  };
  const onChangeConsumption = (value: number) => {
    setConsumtipn(value);
  };

  const handlePriceCalculation = async () => {

  };

  return (
    <Container fluid h={50} display='flex' style={{ marginTop: 50 }}>
      <Box>
        <input
          style={{ height: 42, width: 250, marginRight: 50 }}
          onChange={(event => onChangeConsumption(Number(event.target.value)))}
          placeholder="Electricity consumption (KWH) per hour"
        />
        <select value={priceArea} onChange={(event) => onChangePriceAreaChange(event.target.value)} style={{ height: 50, width: 250 }}>
          <option value="">Select price area</option>
          {priceAreaOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select value={prisModel} onChange={(event) => onChangePriceModelChange(event.target.value)} style={{ height: 50, width: 250, marginLeft: 50 }}>
          <option value="">Select price model</option>
          {prisModelOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button onSubmit={handlePriceCalculation} style={{ height: 42, width: 250, marginRight: 50, marginLeft: 50 }}
        >Calculate price</button>
      </Box>
      <Box>
        <Text ta="right">Total price</Text>
      </Box>
    </Container>
  );
}

export default App;
