import React, { useState } from 'react';
import { Box, Container, Grid, Text } from '@mantine/core';

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
      <Grid display='flex' justify='flex-start'>
        <Grid.Col>

          <input
            style={{ height: 42, width: 250, marginRight: 50 }}
            onChange={(event => onChangeConsumption(Number(event.target.value)))}
            placeholder="Electricity consumption (KWH) per hour"
          />
        </Grid.Col>
        <Grid.Col>
          <select value={priceArea} onChange={(event) => onChangePriceAreaChange(event.target.value)} style={{ height: 50, width: 250, marginTop: 50 }}>
            <option value="">Select price area</option>
            {priceAreaOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Grid.Col>
        <Grid.Col><select value={prisModel} onChange={(event) => onChangePriceModelChange(event.target.value)} style={{ height: 50, width: 250, marginTop: 50 }}>
          <option value="">Select price model</option>
          {prisModelOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select></Grid.Col>
        <Grid.Col> <button onSubmit={handlePriceCalculation} style={{ height: 50, width: 250, marginTop: 50, backgroundColor: 'green' }}
        >Calculate price</button></Grid.Col>
        <Grid.Col>
          <Text ta="left">Total price : </Text>
        </Grid.Col>
      </Grid>
    </Container >
  );
}

export default App;
