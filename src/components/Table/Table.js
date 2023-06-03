/*eslint-disable*/
import React from 'react';

const Table = (props) => (
  <div
    className={
      `card${props.hidden ? ' card-hidden' : ''
      }${props.calendar ? ' card-calendar' : ''
      }${props.plain ? ' card-plain' : ''
      }${props.wizard ? ' card-wizard' : ''}`
    }
  >
    {props.title || props.category ? (
      <div
        className={`table-header${props.textCenter ? ' text-center' : ''}`}
      >
        <h5 className="title">{props.title}</h5>
        <p className="category">{props.category}</p>
      </div>
    ) : (
      ''
    )}
    <div
      className={
        `content${props.ctAllIcons ? ' all-icons' : ''
        }${props.ctFullWidth ? ' content-full-width' : ''
        }${props.ctTextCenter ? ' text-center' : ''
        }${props.tableFullWidth ? ' table-full-width' : ''}`
      }
    >
      {props.content}
    </div>
    {props.stats || props.legend ? (
      <div
        className={
          `footer${props.ftTextCenter ? ' text-center' : ''}`
        }
      >
        {props.legend ? (
          <div className="legend">{props.legend}</div>
        ) : null}
      </div>
    ) : null}
  </div>
);

export default Table;