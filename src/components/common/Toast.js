import { Frame, Page, Button, Toast } from '@shopify/polaris';
import React, { Component } from "react";

function ToastExample() {
    const [active, setActive] = useState(false);
  
    const toggleActive = useCallback(() => setActive((active) => !active), []);
  
    const toastMarkup = active ? (
      <Toast content="Message sent" onDismiss={toggleActive} />
    ) : null;
  
    return (
      <div style={{height: '250px'}}>
        <Frame>
          <Page title="Toast example">
            <Button onClick={toggleActive}>Show Toast</Button>
            {toastMarkup}
          </Page>
        </Frame>
      </div>
    );
  }