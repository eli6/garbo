import { DiscordWorker, DiscordJob } from '../lib/DiscordWorker'
import { diffChanges , defaultMetadata} from '../lib/saveUtils'

class DiffEqualityJob extends DiscordJob {
  declare data: DiscordJob['data'] & {
    existingCompany?: any
    equalityReport: {
      title: string
      description?: string
      year?: string
    }[]
  }
}

const diffEquality = new DiscordWorker<DiffEqualityJob>(
  'diffEquality',
  async (job) => {
    const { equalityReport, existingCompany, url } = job.data
    const metadata = defaultMetadata(url)

    const body = {
      equalityReport,
      metadata,
    }

    const { diff, requiresApproval } = await diffChanges({
      existingCompany,
      before: existingCompany?.equalityReport,
      after: equalityReport,
    })

    if (diff) {
      //send to discord instead of saving to API:
      const formattedInitiatives = equalityReport
        .map(initiative => 
          `📊 **${initiative.title}**\n${initiative.description || ''} ${initiative.year ? `(${initiative.year})` : ''}`
        )
        .join('\n\n')

      await job.sendMessage({
        content: `Jämställdhetsinitiativ hittade: \n\n${formattedInitiatives}`
      })
    }


    return { body, diff, requiresApproval }
  }
)

export default diffEquality 