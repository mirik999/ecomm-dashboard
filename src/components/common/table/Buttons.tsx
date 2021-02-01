import React from 'react';
//components
import Button from "../Button";

const buttons = [
  {
    id: 1,
    name: 'create',
  },
  {
    id: 2,
    name: 'edit',
  },
  {
    id: 3,
    name: 'disable',
  },
  {
    id: 4,
    name: 'activate',
  },
  {
    id: 5,
    name: 'properties',
  },
]

type Props = {
  selected: any[]
  hiddenButtons?: string[]
  getIdAndDisable: (id: string[]) => void
  getIdAndActivate: (id: string[]) => void
  onRouteChange: (route: string) => void
}

const Buttons: React.FC<Props> = ({
  selected,
  hiddenButtons,
  getIdAndDisable,
  getIdAndActivate,
  onRouteChange
}) => {
  return (
    <div className="flex py-3">
      {
        buttons.map((btn, i) => {
          if (!hiddenButtons!.includes(btn.name) && btn.name === "create") {
            return (
              <Button
                key={i}
                label="Create"
                onAction={() => onRouteChange('create')}
                cls="m-0 mr-3"
              />
            )
          }
          if (!hiddenButtons!.includes(btn.name) && btn.name === "edit") {
            return (
              <Button
                key={i}
                label="Edit"
                onAction={() => onRouteChange('update')}
                cls="m-0 mr-3"
                disabled={selected.length !== 1}
              />
            )
          }
          if (!hiddenButtons!.includes(btn.name) && btn.name === "disable") {
            return (
              <Button
                key={i}
                label="Disable"
                onAction={() => getIdAndDisable(selected.map(s => s.id))}
                cls="m-0 mr-3"
                disabled={selected.length === 0}
              />
            )
          }
          if (!hiddenButtons!.includes(btn.name) && btn.name === "activate") {
            return (
              <Button
                key={i}
                label="Activate"
                onAction={() => getIdAndActivate(selected.map(s => s.id))}
                cls="m-0 mr-3"
                disabled={selected.length === 0}
              />
            )
          }
          if (!hiddenButtons!.includes(btn.name) && btn.name === "properties") {
            return (
              <Button
                key={i}
                label="Properties"
                onAction={() => false}
                cls="m-0 mr-3"
                disabled={selected.length === 0}
              />
            )
          }

          return null;
        })
      }
    </div>
  );
}

export default Buttons;
