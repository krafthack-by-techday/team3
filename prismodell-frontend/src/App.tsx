import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Box, Button, Container, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { GaugeComponent } from 'react-gauge-component';
import { ApiResponse } from './api/type';
import axios from 'axios';

function App() {
  const [prisModel, setPrisModel] = useState('');
  const [priceArea, setPriceArea] = useState('');
  const [consumption, setConsumtipn] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [selectYear, setSelectYear] = useState('2023');

  const data: ApiResponse = {
    year: 2023,
    profil: "Profil B",
    best_modell: "norgespris",
    best_price: 4001.15,
    percent_savings_vs_others: {
      strømstøtte: 42.47,
    }
  };

  const [bestPriceModel, setBestPriceModel] = useState<ApiResponse>(data);

  const [profile, setProfile] = useState('B');

  const handleProfileChange = (value: string) => {

    setProfile(value);

  }

  const getData = async (url: string) => {
    await axios.get(url, {
      params: {
        year: selectYear,
        profil: profile

      }
    }).then(response => {
      console.log('response', response);
      setBestPriceModel(response.data);
    })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(() => { getData('http://127.0.0.1:8000/best_model') }, [profile, selectYear]);
  console.log('bestPriceModel', bestPriceModel);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Tooltip title="change profile"><Button onClick={() => handleProfileChange(profile == 'A' ? 'B' : 'A')}>
            <Avatar>{profile}</Avatar>
          </Button></Tooltip>

        </Toolbar>
      </AppBar>
      <Container maxWidth='sm'>
        <Box display='flex' justifyContent='center' fontStyle='normal' marginTop={10} gap={5}>
          <Button variant={selectYear == '2023' ? "contained" : "outlined"} onClick={() => setSelectYear('2023')}>2023</Button>
          <Button variant={selectYear == '2024' ? "contained" : "outlined"} onClick={() => setSelectYear('2024')}>2024</Button>
        </Box>
        <Box display='flex' justifyContent='center' fontStyle='normal' marginTop={10}>
          <Typography>The best model is {data.best_modell}. </Typography>
        </Box>
        <GaugeComponent
          value={bestPriceModel?.percent_savings_vs_others.strømstøtte}
          type="radial"
          labels={{
            tickLabels: {
              type: "inner",
              ticks: [
                { value: 20 },
                { value: 40 },
                { value: 60 },
                { value: 80 },
                { value: 100 }
              ]
            }
          }}
          arc={{
            colorArray: ['#5BE12C', '#EA4228'],
            subArcs: [{ limit: 10 }, { limit: 30 }, {}, {}, {}],
            padding: 0.02,
            width: 0.3
          }}
          pointer={{
            elastic: true,
            animationDelay: 0
          }}
        />
      </Container>
    </Box>
  );
}

export default App;
