import React from 'react';
//components
import Button from "../Button";

const buttons = [
  {
    id: 1,
    name: 'create',
    type: 'link',
    disable: "never",
    roles: ["admin", "sudo"]
  },
  {
    id: 2,
    name: 'edit',
    type: 'link',
    disable: "non-multiple",
    roles: ["admin", "sudo"]
  },
  {
    id: 3,
    name: 'disable',
    type: 'action',
    disable: "non-zero",
    roles: ["admin", "sudo"]
  },
  {
    id: 4,
    name: 'activate',
    type: 'action',
    disable: "non-zero",
    roles: ["admin", "sudo"]
  },
  {
    id: 5,
    name: 'properties',
    type: 'action',
    disable: "non-zero",
    roles: ["admin", "sudo"]
  },
  {
    id: 6,
    name: 'delete',
    type: 'action',
    disable: "non-zero",
    roles: ["sudo"]
  },
]

type Props = {
  selected: any[]
  roles: string[],
  getIds: (id: string[], action: string) => void
  onRouteChange: (route: string) => void
}

const Buttons: React.FC<Props> = ({
  selected,
  getIds,
  roles,
  onRouteChange
}) => {

  return (
    <div className="flex py-3">
      {
        buttons
          .filter(btn => btn.roles.some(b => roles.includes(b)))
          .map((btn, i) => (
            <Button
              key={i}
              label={btn.name}
              onAction={() => {
                btn.type === "link" ?
                  onRouteChange(btn.name) :
                    getIds(selected.map(s => s.id), btn.name)
              }}
              cls="m-0 mr-3"
              disabled={
                btn.disable === "non-multiple" ?
                  selected.length !== 1 :
                    (btn.disable === "non-zero"
                      ? selected.length === 0 :
                        false)
              }
            />
        ))
      }
    </div>
  );
}

Buttons.defaultProps = {
  selected: [],
}

export default Buttons;
