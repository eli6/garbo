import { z } from 'zod'

export const schema = z.object({
  equalityReport: z.array(
    z.object({
      title: z.string(),
      description: z.string().optional(),
      year: z.string().optional(),
    })
  ),
})

export const prompt = `
Extract the company equality and diversity initiatives. Add it as field equalityReport:

Be as accurate as possible when extracting equality and diversity initiatives. These values will be plotted as dots on a graph later on.

Look for concrete intiatives, not general statements.

Prioritize the list and only include the most important initiatives. If the list is long, only include max three most important ones.

If you cannot find three initiatives, output one or two initiatives instead.

*** Language: Write in SWEDISH ***
If the text is in english, translate it to swedish.

Example: Ensure the output is in JSON format and do not use markdown.
\`\`\`json
{
  "equalityReport": [
    {
      "title": "Ny kurs för att främja kvinnors ledarskap",
      "description": "Vi har infört en ny kurs för att främja kvinnors ledarskap",
      "year": "2024"
    }
  ]
}
\`\`\`
`

const queryTexts = [
  'Diversity and inclusion report',
  'Gender distribution',
  'Equality initiatives'
]

export default { prompt, schema, queryTexts }
