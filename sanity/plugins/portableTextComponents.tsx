/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlockDecoratorProps } from "sanity";

export const portableTextHighlight = (props: BlockDecoratorProps) => (
  <span style={{ backgroundColor: "#0f0" }}>{props.children}</span>
);

export const portableTextWithFonts = (props: BlockDecoratorProps) => (
    <span className="" style={{
        fontFamily: "var(--font-breeserif)",
    }}>{props.children}</span>
);

import { set, unset } from 'sanity'

export function FontStyleDropdown(props: { value: any; onChange: any; }) {
  const { value, onChange } = props

  const handleChange = (event: { target: { value: any; }; }) => {
    const val = event.target.value
    onChange(val ? set(val) : unset())
  }

  return (
    <div style={{ marginTop: '1em' }}>
      <label style={{ fontWeight: '600' }}>Font Family</label>
      <select
        value={value || ''}
        onChange={handleChange}
        style={{
          display: 'block',
          marginTop: '0.5em',
          padding: '0.3em',
          fontSize: '14px',
        }}
      >
        <option value="">Default (Inter)</option>
        <option value="lato">Lato</option>
        <option value="serif">Serif Accent</option>
      </select>
    </div>
  )
}
