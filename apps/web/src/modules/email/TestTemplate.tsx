import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/londrina-solid'
import React from 'react'

import 'src/styles/globals.css'
import 'src/styles/styles.css'

type TestTemplateProps = {
  name: string
}

export const TestTemplate = ({ name }: TestTemplateProps) => {
  return (
    <div
      style={{
        width: '600px',
        height: '400px',
        backgroundColor: 'pink',
        display: 'table',
        margin: 'auto',
      }}
    >
      <span
        style={{
          display: 'table-cell',
          verticalAlign: 'middle',
          textAlign: 'center',
          fontSize: '28px',
        }}
      >
        {name}
      </span>
    </div>
    // <ThemeProvider as="body" theme={lightTheme} m="x0">
    //   <Text fontSize={28} fontWeight={'display'}>
    //     Welcome, {name}!
    //   </Text>
    // </ThemeProvider>
  )
}
