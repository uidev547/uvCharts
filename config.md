Almost all settings related to the graph being rendered are modify-able using the config object which is one of the parameters used in building your graph.

The configuration itself is split into different groups based on which part of the graph they affect. Here is a overview of each of them:
- graph
  - palette (string)
    Defines the color palette used while rendering the graph. Color palettes are predefined, ability to add custom color palettes is coming soon.
  - background (#color)
    Defines the background color of the graph
  - type (string)
    Defines the type of chart which shall be rendered based on the graphdef
      values: colorcode(#zzzzzz,#zzz), colorname('white' ...)
  - orientation (string)
    Defines the orientation of the graph rendered.
      values: Horizontal, Vertical

- meta
  - position (string)
    This is the selector string of the dom element under which the graph needs to be rendered
  - caption (string)
    Caption for the graph
  - subCaption (string)
    Subcaption for the graph

- dimension
  - width (string/value)
    Width of the graph in pixels (without 'px')
  - height (string/value)
    Height of the graph in pixels (without 'px')

- margin
  - top (string/value)
    Top margin of the graph in pixels (usually this space is occupied by Caption and Subcaption)
  - bottom (string/value)
    Bottom Margin of the graph in pixels (usually this space is occupied by the horizontal axis label and caption)
  - left (string/value)
    Left margin of the graph in pixels (usually this space is occupied by vertical axis label and caption)
  - right (string/value)
    Right margin of the graph in pixels (usually this space is occupied by the legend)

- frame
  - bgcolor (#color)
    Defines the background color of the frame, includes the graph and the margins

- axis
  - ticks
    Defines the number of ticks against the measuring axis
  - subticks
    Defines the number of subticks against the measuring axis between ticks
  - padding
    Defines the space between between the axis and axis labels in pixels
  - minor
    Defines the minor tick length on the axis containing the label headers
  - strokecolor
    Defines the color used for axis strokes
  - fontfamily