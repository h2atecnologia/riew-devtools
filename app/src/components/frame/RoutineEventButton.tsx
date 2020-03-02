import React from 'react';
import { RowEventButton, EventColumnIdx } from '../utils/ui';
import {
  PlayCircle,
  StopCircle,
  Play,
  X,
  AlertCircle,
  Loading,
} from '../utils/icons';
import { EventButtonProps, What } from '../../types';
import EventButtonIcon from '../utils/EventButtonIcon';

export default function RoutineEventButton({
  data,
  actions,
}: EventButtonProps) {
  let created = false;
  const icons = actions
    .map((action, idx) => {
      const { what, who } = action;

      if (who.rawId !== data.rawId)
        return (
          <img
            key={idx}
            src={created ? './img/app_routine_0.jpg' : './img/app_empty.jpg'}
          />
        );
      const style = { color: 'black' };
      switch (what) {
        case What.ROUTINE_STOPPED:
          return (
            <EventButtonIcon action={action} key={idx}>
              <EventColumnIdx>{idx + 1}</EventColumnIdx>
              <StopCircle style={style} />
            </EventButtonIcon>
          );
        case What.ROUTINE_RERUN:
          return (
            <EventButtonIcon action={action} key={idx}>
              <EventColumnIdx>{idx + 1}</EventColumnIdx>
              <PlayCircle style={style} />
            </EventButtonIcon>
          );
        case What.ROUTINE_END:
          return (
            <EventButtonIcon action={action} key={idx}>
              <EventColumnIdx>{idx + 1}</EventColumnIdx>
              <X style={style} />
            </EventButtonIcon>
          );
        case What.ROUTINE_ASYNC_BEGIN:
          return (
            <EventButtonIcon action={action} key={idx}>
              <EventColumnIdx>{idx + 1}</EventColumnIdx>
              <Loading style={style} />
            </EventButtonIcon>
          );
        case What.ROUTINE_ASYNC_END:
          created = false;
          return (
            <EventButtonIcon action={action} key={idx}>
              <EventColumnIdx>{idx + 1}</EventColumnIdx>
              <Play style={style} />
            </EventButtonIcon>
          );
        case What.ROUTINE_ASYNC_ERROR:
          return (
            <EventButtonIcon action={action} key={idx}>
              <EventColumnIdx>{idx + 1}</EventColumnIdx>
              <AlertCircle style={style} />
            </EventButtonIcon>
          );
        case What.ROUTINE_STARTED:
          created = true;
          return (
            <EventButtonIcon action={action} key={idx}>
              <EventColumnIdx>{idx + 1}</EventColumnIdx>
              <img src="./img/app_routine_started.jpg" />
            </EventButtonIcon>
          );
        default:
          return (
            <img
              key={idx}
              src={created ? './img/app_routine_0.jpg' : './img/app_empty.jpg'}
            />
          );
      }
    })
    .filter(i => i);

  return (
    <RowEventButton
      data-id={data.rawId}
      columns={`repeat(${actions.length}, 1fr)`}
    >
      {icons.length > 0 && icons}
    </RowEventButton>
  );
}
