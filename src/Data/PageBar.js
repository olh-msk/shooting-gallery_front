import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PageBar = () => {
  const navigate = useNavigate();

  const handleGoToCustomerLevelsDiagram = (event) => {
    event.preventDefault();
    navigate('/customerLevelsDiagram');
  };

  const handleGoToCaliberDiagram = (event) => {
    event.preventDefault();
    navigate('/caliberDiagram');
  };

  const handleGoToIncomeDiffDiagram = (event) => {
    event.preventDefault();
    navigate('/incomeDiffDiagram');
  };

  const handleGoToTable = (event) => {
    event.preventDefault();
    navigate('/factshow');
  };

  const handleLogOut = (event) => {
    event.preventDefault();
    navigate('/');
  };

  const handleGoToOltpMeta = (event) => {
    event.preventDefault();
    navigate('/oltpMeta');
  };

  const handleGoToDimensions = (event) => {
    event.preventDefault();
    navigate('/dimensions');
  };

  const handleGoToTaskTables = (event) => {
    event.preventDefault();
    navigate('/taskTables');
  };

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: 'yellow' }}
      marginBottom="10px"
    >
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <div>
          <Button
            variant="contained"
            onClick={handleGoToTable}
            style={{
              marginRight: '10px',
              backgroundColor: '#00cccc',
              color: '#000000',
              fontSize: '15px',
              fontWeight: 'bold',
            }}
          >
            Go to Fact Table
          </Button>
          <Button
            variant="contained"
            onClick={handleGoToCustomerLevelsDiagram}
            style={{
              marginRight: '10px',
              backgroundColor: '#00cccc',
              color: '#000000',
              fontSize: '15px',
              fontWeight: 'bold',
            }}
          >
            Go to customer level diagram
          </Button>
          <Button
            variant="contained"
            onClick={handleGoToCaliberDiagram}
            style={{
              marginRight: '10px',
              backgroundColor: '#00cccc',
              color: '#000000',
              fontSize: '15px',
              fontWeight: 'bold',
            }}
          >
            Go to calibers diagram
          </Button>
          <Button
            variant="contained"
            onClick={handleGoToIncomeDiffDiagram}
            style={{
              marginRight: '10px',
              backgroundColor: '#00cccc',
              color: '#000000',
              fontSize: '15px',
              fontWeight: 'bold',
            }}
          >
            Go to income difference
          </Button>

          <Button
            variant="contained"
            onClick={handleGoToOltpMeta}
            style={{
              marginRight: '10px',
              backgroundColor: '#00cccc',
              color: '#000000',
              fontSize: '15px',
              fontWeight: 'bold',
            }}
          >
            Go to OLTP Metadata
          </Button>
          <Button
            variant="contained"
            onClick={handleGoToDimensions}
            style={{
              marginRight: '10px',
              backgroundColor: '#00cccc',
              color: '#000000',
              fontSize: '15px',
              fontWeight: 'bold',
            }}
          >
            Go to Dimensions
          </Button>
          <Button
            variant="contained"
            onClick={handleGoToTaskTables}
            style={{
              marginRight: '10px',
              backgroundColor: '#00cccc',
              color: '#000000',
              fontSize: '15px',
              fontWeight: 'bold',
            }}
          >
            Go to Task Tables
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={handleLogOut}
            backgroundColor={'#1ad1ff'}
            style={{
              marginRight: '10px',
              backgroundColor: '#00cccc',
              color: '#000000',
              fontSize: '15px',
              fontWeight: 'bold',
            }}
          >
            Log out
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default PageBar;
