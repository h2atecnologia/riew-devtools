import React, { useReducer, useEffect } from 'react';
import bridge from '../bridge';
import Frames from './Frames';
import { NoEvents, Code, Title } from './utils/ui';
import Tooltip from './Tooltip';
import { Sad } from './utils/icons';
import { Event } from '../types';
import graphReducer, { initialState } from './reducers/graphReducer';

export default function App() {
  const [graph, addEvent] = useReducer(graphReducer, initialState);

  useEffect(() => {
    bridge((event: Event) => addEvent(event));
  }, []);

  return graph.rows.length > 0 ? (
    <>
      <Frames rows={graph.rows} columns={graph.columns} />
      <Tooltip />
    </>
  ) : (
    <NoEvents>
      <div>
        <Title>
          <Sad /> No events yet...
        </Title>
        <p>Or maybe you forgot to run the Riew inspector:</p>
        <Code>{`import { inspector } from 'riew';

inspector();`}</Code>
      </div>
    </NoEvents>
  );
}
