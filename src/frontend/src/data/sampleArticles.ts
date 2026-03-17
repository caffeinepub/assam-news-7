export interface SampleArticle {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  imageUrl: string;
  tags: string[];
  isBreaking: boolean;
  publishedAt: Date;
  visible: boolean;
  source: "manual" | "auto";
}

export const sampleArticles: SampleArticle[] = [
  {
    id: 1,
    title:
      "CM Himanta Biswa Sarma Launches ₹2,000 Crore Infrastructure Drive Across Assam",
    summary:
      "Chief Minister Himanta Biswa Sarma unveiled an ambitious infrastructure development plan focusing on roads, bridges, and connectivity projects across 26 districts of Assam.",
    content: `Chief Minister Himanta Biswa Sarma on Monday unveiled an ambitious ₹2,000 crore infrastructure development plan that will transform connectivity across all 26 districts of Assam over the next three years.

The flagship initiative, dubbed 'Assam Unnati Yojana', will see construction of 450 km of new state highways, rehabilitation of 1,200 km of district roads, and the building of 38 new bridges over the Brahmaputra and its tributaries.

"This is a transformative moment for Assam. We are committed to ensuring that no village in our state remains disconnected," CM Sarma said at a press conference in Guwahati.

The project will be funded through a combination of state funds, central government grants under the PMGSY scheme, and World Bank assistance. Work is expected to begin by the end of the month.

Opposition parties welcomed the announcement but demanded a clear timeline and accountability framework for project completion.`,
    category: "politics",
    author: "Pranab Goswami",
    imageUrl: "https://picsum.photos/800/450?random=1",
    tags: ["Assam", "Infrastructure", "CM Sarma", "Development"],
    isBreaking: true,
    publishedAt: new Date(Date.now() - 1000 * 60 * 30),
    visible: true,
    source: "manual",
  },
  {
    id: 2,
    title:
      "Rhino Census 2025: Kaziranga Records 2,613 One-Horned Rhinos, a New High",
    summary:
      "The latest census at Kaziranga National Park reveals a record-breaking population of one-horned rhinoceros, signaling the success of conservation efforts in Assam.",
    content: `Kaziranga National Park has recorded an all-time high population of 2,613 one-horned rhinoceroses in the 2025 census, officials confirmed on Tuesday, marking a significant conservation milestone for Assam.

The census, conducted over three days using a combination of helicopter surveys, elephant-back counts, and camera traps, showed a 4.8% increase from the 2021 figure of 2,613.

Forest Minister Chandra Mohan Patowary called the result "a testament to the dedication of our forest guards and the communities surrounding the park."

Kaziranga, a UNESCO World Heritage Site, is home to over 70% of the world's great one-horned rhinoceros population. The park's success story has been studied by conservationists worldwide.

However, officials warned that flooding during monsoon season and encroachment on buffer zones remain persistent threats that require continuous attention.`,
    category: "local",
    author: "Mridula Borah",
    imageUrl: "https://picsum.photos/800/450?random=2",
    tags: ["Kaziranga", "Rhino", "Wildlife", "Conservation"],
    isBreaking: false,
    publishedAt: new Date(Date.now() - 1000 * 60 * 90),
    visible: true,
    source: "manual",
  },
  {
    id: 3,
    title: "Assam Tea Industry Posts Record ₹14,000 Crore Export in FY2024-25",
    summary:
      "The Assam tea industry achieved record-breaking export revenues, with premium Assam orthodox tea seeing surging demand from Europe and Japan.",
    content: `The Assam tea industry closed FY2024-25 with a record ₹14,000 crore in export revenues, the Tea Board of India announced, representing a 12% jump from the previous fiscal year.

Premium orthodox teas from the Brahmaputra valley saw particularly strong demand from Germany, the UK, and Japan, where consumers are increasingly willing to pay premium prices for single-estate teas.

The Tocklai Tea Research Institute has attributed part of the success to the adoption of climate-resilient cultivars and improved post-harvest processing techniques across major estates in the Upper Assam belt.

However, the industry faces headwinds with rising labor costs and climate variability affecting yield consistency. The average auction price at the Guwahati Tea Auction Centre rose to ₹235 per kg, up 18% year-on-year.

Small tea growers, who now account for 52% of Assam's total tea production, are demanding better prices and a more equitable share of export revenues.`,
    category: "business",
    author: "Dipankar Nath",
    imageUrl: "https://picsum.photos/800/450?random=3",
    tags: ["Tea", "Export", "Economy", "Assam Tea"],
    isBreaking: false,
    publishedAt: new Date(Date.now() - 1000 * 60 * 180),
    visible: true,
    source: "manual",
  },
  {
    id: 4,
    title:
      "Guwahati FC Secures Historic I-League Promotion After Thrilling Final",
    summary:
      "Guwahati FC clinched promotion to the Indian Super League after a dramatic penalty shootout victory in the I-League Second Division final at Sarusajai Stadium.",
    content: `Guwahati FC created history on Sunday, securing promotion to the Indian Super League after defeating Minerva Punjab 4-3 on penalties in an electric final at Sarusajai Stadium before a capacity crowd of 35,000.

The match ended 1-1 after extra time, with Guwahati's equalizer coming in the 118th minute through striker Raju Hazarika, who had been one of the standout performers throughout the tournament.

The victory represents a watershed moment for football in the Northeast, with Guwahati FC becoming the first club from Assam to reach the top tier of Indian club football.

"This is for every boy in Assam who dreamed of playing professional football," captain Bijoy Das said, visibly emotional after receiving the trophy.

The All India Football Federation has confirmed that Guwahati FC will compete in the ISL from the 2025-26 season, with the club now looking to upgrade facilities at Sarusajai Stadium.`,
    category: "sports",
    author: "Rituraj Sonowal",
    imageUrl: "https://picsum.photos/800/450?random=4",
    tags: ["Football", "Guwahati FC", "I-League", "Sports"],
    isBreaking: true,
    publishedAt: new Date(Date.now() - 1000 * 60 * 240),
    visible: true,
    source: "manual",
  },
  {
    id: 5,
    title:
      "IIT Guwahati Researchers Develop Flood Early Warning System for Brahmaputra Valley",
    summary:
      "Scientists at IIT Guwahati have created an AI-powered flood prediction model with 92% accuracy that could save thousands of lives during annual monsoon flooding in Assam.",
    content: `Researchers at the Indian Institute of Technology Guwahati have developed a groundbreaking AI-powered flood early warning system that can predict catastrophic flooding in the Brahmaputra valley up to 72 hours in advance with 92% accuracy.

The system, called BrahmaAlert, integrates real-time satellite imagery, rainfall data from 340 monitoring stations, and historical flood patterns to generate hyperlocal predictions at the sub-district level.

Professor Arup Kumar Sarma from the Civil Engineering department, who led the research team, said the system could potentially be deployed across the entire Assam riverine network within 18 months.

"Every year, Assam loses lives and livelihoods to floods that were, in theory, predictable. BrahmaAlert changes that equation," Prof. Sarma explained.

The Assam Disaster Management Authority has expressed strong interest in integrating BrahmaAlert with its existing warning infrastructure. The research has been published in the journal Nature Water.`,
    category: "technology",
    author: "Shreya Kalita",
    imageUrl: "https://picsum.photos/800/450?random=5",
    tags: ["IIT Guwahati", "Flood", "Technology", "AI", "Research"],
    isBreaking: false,
    publishedAt: new Date(Date.now() - 1000 * 60 * 360),
    visible: true,
    source: "manual",
  },
  {
    id: 6,
    title:
      "National Health Mission: Assam Reduces Infant Mortality Rate to 32 per 1,000",
    summary:
      "The latest NHM data shows Assam has achieved its lowest-ever infant mortality rate, driven by improved healthcare access in rural areas and better maternal health programs.",
    content: `Assam has achieved a landmark public health milestone, reducing its infant mortality rate (IMR) to 32 per 1,000 live births, down from 48 in 2018, according to the latest National Health Mission report released in New Delhi.

The improvement is attributed to the expansion of the Janani Suraksha Yojana, increased institutional deliveries now at 87%, and the deployment of over 2,000 additional Auxiliary Nurse Midwives (ANMs) in remote areas including Bodoland and the Karbi Anglong hills.

Health Minister Keshab Mahanta called it "a tribute to the frontline health workers who work in challenging conditions to serve our people."

However, experts note that Assam's IMR still remains above the national average of 27, and significant disparities exist between urban centers like Guwahati and remote tribal districts where the rate can be as high as 58.

The state government has announced plans to establish 150 new Primary Health Centres by 2026 to close the gap further.`,
    category: "health",
    author: "Dr. Ananya Dutta",
    imageUrl: "https://picsum.photos/800/450?random=6",
    tags: ["Health", "NHM", "Infant Mortality", "Public Health"],
    isBreaking: false,
    publishedAt: new Date(Date.now() - 1000 * 60 * 480),
    visible: true,
    source: "manual",
  },
  {
    id: 7,
    title:
      "Bihu Festival 2025: Rongali Bihu Celebrations Draw 5 Lakh Visitors to Guwahati",
    summary:
      "The Rongali Bihu festival in Guwahati attracted record visitors this year with spectacular cultural performances, traditional games, and the biggest Bihu dance gathering ever recorded.",
    content: `Guwahati was a riot of colour and culture this week as an estimated five lakh visitors descended on the city for Rongali Bihu 2025, making it the largest celebration of Assam's harvest festival in recorded history.

The centerpiece event at Nehru Stadium featured a record-breaking Bihu dance performance involving 11,264 dancers performing simultaneously, which organisers have submitted for recognition to the Limca Book of Records.

Traditional Bihu games including egg fights (dim khela), buffalo fights at Ahatguri, and bulbul fights were held across multiple venues, drawing enthusiastic participation from across the state.

The festival also featured a vibrant cultural fair showcasing traditional Assamese crafts including Muga silk weaving, bell metal work from Sarthebari, and terracotta art from Dhubri.

"Bihu is not just a festival, it is the heartbeat of Assam," said Cultural Affairs Minister Bimal Borah. The celebrations are set to continue through the week with events in all 36 districts.`,
    category: "entertainment",
    author: "Kabita Barua",
    imageUrl: "https://picsum.photos/800/450?random=7",
    tags: ["Bihu", "Festival", "Culture", "Guwahati", "Assam"],
    isBreaking: false,
    publishedAt: new Date(Date.now() - 1000 * 60 * 600),
    visible: true,
    source: "manual",
  },
  {
    id: 8,
    title:
      "India-Bangladesh Trade Corridor: Assam's Petrapole-Benapole Route Gets ₹800 Crore Upgrade",
    summary:
      "The Union government has approved a major upgrade of the Assam-linked India-Bangladesh trade corridor, expected to triple cross-border trade volumes and boost the Northeast economy.",
    content: `The Union Ministry of Commerce has approved an ₹800 crore upgrade of the India-Bangladesh trade corridor running through Assam, a development that experts say could transform the Northeast's economic landscape over the next decade.

The project includes construction of a dedicated freight corridor between Agartala and Akhaura, expansion of the Sutarkandi Integrated Check Post in Cachar district, and development of a logistics hub in Guwahati to serve as the primary consolidation center for Northeast India-Bangladesh trade.

Currently bilateral trade through Assam accounts for ₹3,200 crore annually; the upgraded infrastructure is projected to triple this to ₹9,500 crore by 2030.

Chambers of Commerce in Guwahati, Silchar, and Dibrugarh have welcomed the announcement, with the Assam Chamber of Commerce president saying it "opens a new chapter in the Northeast's Act East journey."

The project is expected to generate over 12,000 direct and indirect jobs in the logistics and trade facilitation sectors in Assam.`,
    category: "business",
    author: "Hemanta Gogoi",
    imageUrl: "https://picsum.photos/800/450?random=8",
    tags: ["Trade", "Bangladesh", "Economy", "Northeast", "Infrastructure"],
    isBreaking: false,
    publishedAt: new Date(Date.now() - 1000 * 60 * 720),
    visible: true,
    source: "manual",
  },
  {
    id: 9,
    title:
      "Assam Rifles Foils Major Drug Smuggling Attempt, Seizes ₹45 Crore Heroin in Mizoram Border",
    summary:
      "Security forces intercepted a major drug trafficking operation near the Assam-Mizoram border, seizing over 2 kg of premium heroin and arresting four smugglers with Myanmar connections.",
    content: `In one of the largest drug seizures in the Northeast this year, personnel from the Assam Rifles intercepted a drug trafficking operation near the Assam-Mizoram border in Cachar district on Wednesday, seizing 2.3 kg of heroin with an estimated street value of ₹45 crore.

Four individuals, including two with suspected links to Myanmar-based trafficking networks, were arrested during the operation. Acting on intelligence inputs, a team set up a checkpoint on the NH-306 near Lailapur, intercepting a vehicle carrying the contraband concealed within false compartments.

The seizure is part of a wider crackdown under Operation Sunrise III, a coordinated effort by Assam Police, Assam Rifles, and the Narcotics Control Bureau targeting the 'Golden Triangle' drug route through the Northeast.

Assam's Director General of Police GP Singh stated: "We will not allow Assam to become a transit corridor for narcotics. Our zero-tolerance policy will continue with full force."

The arrested individuals are being produced before a special NDPS court in Silchar.`,
    category: "local",
    author: "Biren Deka",
    imageUrl: "https://picsum.photos/800/450?random=9",
    tags: ["Drug Seizure", "Assam Rifles", "Security", "Border"],
    isBreaking: true,
    publishedAt: new Date(Date.now() - 1000 * 60 * 45),
    visible: true,
    source: "manual",
  },
  {
    id: 10,
    title:
      "Northeast India's First 5G Smart City Pilot Launches in Guwahati's Pan Bazaar",
    summary:
      "Guwahati becomes the first city in Northeast India to launch a comprehensive 5G smart city pilot, featuring intelligent traffic management, smart streetlights, and real-time air quality monitoring.",
    content: `Guwahati's Pan Bazaar commercial district became the first area in Northeast India to go live with a comprehensive 5G-powered smart city system on Thursday, a joint initiative between the municipal corporation, Jio, and the central government's Smart Cities Mission.

The pilot covers a 2.5 sq km area and integrates AI-driven traffic signal management that has already reduced average commute times by 23% in early testing, smart LED streetlights that adjust automatically based on ambient light and pedestrian density, and a network of 80 air quality and noise pollution sensors feeding data to a public dashboard.

Guwahati Metropolitan Development Authority Chairman Debabrata Saikia said the system will be expanded to cover all of Guwahati's 92 wards over the next 24 months if the pilot proves successful.

The initiative is part of the Ministry of Electronics & IT's Northeast Digital Connectivity Mission, which has earmarked ₹4,200 crore for digital infrastructure across the eight northeastern states.

Residents in Pan Bazaar have responded positively to the initial rollout, with many highlighting the improved traffic flow during peak evening hours as an immediate benefit.`,
    category: "technology",
    author: "Nirupama Saikia",
    imageUrl: "https://picsum.photos/800/450?random=10",
    tags: ["5G", "Smart City", "Guwahati", "Technology", "Digital"],
    isBreaking: false,
    publishedAt: new Date(Date.now() - 1000 * 60 * 840),
    visible: true,
    source: "manual",
  },
];
