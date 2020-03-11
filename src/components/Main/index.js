/* eslint-disable no-alert */
/* eslint-disable no-constant-condition */

import React from 'react';
import './index.css';

import { IoIosSwap } from 'react-icons/io';

export default function Main() {
  const [opt, setOpt] = React.useState(1);
  const [binario, setBinario] = React.useState('');
  const [decimal, setDecimal] = React.useState('');

  const refBin = React.createRef();
  const refDec = React.createRef();

  function bin2Dec(value) {
    const v = value
      .split('')
      .map(key => {
        let w;
        if (key === '1' || key === '0') {
          w = key;
        } else {
          alert('Enter only 0 or 1');
        }
        return w;
      })
      .join('');

    setBinario(v);
    setDecimal(parseInt(v, 2) || '');
  }

  function dec2Bin(value) {
    const v = value
      .split('')
      .map(key => {
        let w;
        if (
          key === '1' ||
          key === '2' ||
          key === '3' ||
          key === '4' ||
          key === '5' ||
          key === '6' ||
          key === '7' ||
          key === '8' ||
          key === '9' ||
          key === '0'
        ) {
          w = key;
        } else {
          alert('Enter numbers only (0 to 9)');
        }
        return w;
      })
      .join('');

    let dec;
    let bin;

    if (v !== undefined) {
      let p = v;
      let q = Math.trunc(p / 2);
      let r = p - q * 2;
      let b = String(r);

      while (1 < 2) {
        if (r === 1 || r === 0) {
          if (q === 1 || q === 0) {
            b = String(q) + b;
            break;
          }
        }

        p = q;
        q = Math.trunc(p / 2);
        r = p - q * 2;
        b = String(r) + b;
      }

      dec = parseInt(v, 10);
      bin = parseInt(b, 10);
    }

    setDecimal(dec || '');
    setBinario(bin || '');
  }

  function autoresize(el) {
    const e = el;
    setTimeout(() => {
      e.style.cssText = `height:auto`;
      e.style.cssText = `height:${e.scrollHeight}px`;
    }, 0);
  }

  function handleConvert(e) {
    if (e.target.id === 'Binario') {
      bin2Dec(e.target.value);
      autoresize(refDec.current);
    } else {
      dec2Bin(e.target.value);
      autoresize(refBin.current);
    }
  }

  function handleOpt() {
    setOpt(!opt);
    autoresize(refBin.current);
    autoresize(refDec.current);
  }

  return (
    <main className="container">
      <div className="input-group">
        <label htmlFor={opt ? 'Binario' : 'Decimal'}>
          {opt ? 'Binario' : 'Decimal'}
        </label>
        <textarea
          type="text"
          rows="1"
          name={opt ? 'Binario' : 'Decimal'}
          id={opt ? 'Binario' : 'Decimal'}
          placeholder="Input"
          ref={opt ? refBin : refDec}
          value={opt ? binario : decimal.toLocaleString()}
          onChange={e => handleConvert(e)}
          onKeyDown={e => autoresize(e.target)}
        />
      </div>

      <button type="button" title="Alterar" onClick={() => handleOpt()}>
        <IoIosSwap size="30px" color="#fff" />
      </button>

      <div className="input-group">
        <label htmlFor={!opt ? 'Binario' : 'Decimal'}>
          {!opt ? 'Binario' : 'Decimal'}
        </label>
        <textarea
          type="text"
          rows="1"
          name={!opt ? 'Binario' : 'Decimal'}
          id={!opt ? 'Binario' : 'Decimal'}
          placeholder="Output"
          ref={!opt ? refBin : refDec}
          value={!opt ? binario : decimal.toLocaleString()}
          onChange={e => handleConvert(e)}
          onKeyDown={e => autoresize(e.target)}
        />
      </div>
    </main>
  );
}
