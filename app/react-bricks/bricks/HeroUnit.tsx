import React, { Children } from 'react'
import { Text, RichText, Image, types } from 'react-bricks/frontend'

//=============================
// Local Types
//=============================
type Padding = 'big' | 'small'

interface HeroUnitProps {
  padding: Padding
  title: string
  text: string
}

//=============================
// Component to be rendered
//=============================
const MyHeroUnit: types.Brick<HeroUnitProps> = ({ padding }) => {
  return (
    <div className={`mx-auto max-w-xl px-6 ${padding === 'big' ? 'py-20' : 'py-12'}`}>
      <div className="flex flex-col items-center">
        <Image propName="icon" alt="Icon" maxWidth={80} aspectRatio={1} imageClassName="w-20 mb-5" />
        <Text
          renderBlock={props => (
            <h1 className="mb-3 text-center text-3xl font-black leading-tight text-gray-900 dark:text-white sm:text-4xl">
              {props.children}
            </h1>
          )}
          renderPlaceholder={props => <span style={{ opacity: '30%' }}>{props.children}</span>}
          placeholder="Type a title..."
          propName="title"
        />
        <RichText
          renderBlock={props => (
            <p className="text-center text-xl leading-relaxed text-gray-700 dark:text-gray-100">
              {props.children}
            </p>
          )}
          placeholder="Type a text..."
          propName="text"
          allowedFeatures={[
            types.RichTextFeatures.Bold,
            types.RichTextFeatures.Italic,
            types.RichTextFeatures.Highlight,
            types.RichTextFeatures.Code,
            types.RichTextFeatures.Link,
          ]}
          renderCode={props => (
            <code className="rounded bg-gray-200 py-1 px-2 text-sm dark:bg-gray-700">{props.children}</code>
          )}
        />
      </div>
    </div>
  )
}

//=============================
// Brick Schema
//=============================
MyHeroUnit.schema = {
  name: 'my-hero-unit',
  label: 'Custom Hero Unit',
  getDefaultProps: () => ({
    padding: 'big',
    title: 'This is a custom Hero Unit',
    text: "We are a hi-tech web development company committed to deliver great products on time. We love to understand our customers' needs and exceed expectations.",
  }),
  sideEditProps: [
    {
      name: 'padding',
      label: 'Padding',
      type: types.SideEditPropType.Select,
      selectOptions: {
        display: types.OptionsDisplay.Select,
        options: [
          { value: 'big', label: 'Big Padding' },
          { value: 'small', label: 'Small Padding' },
        ],
      },
    },
  ],
}

export default MyHeroUnit
