import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Event {
  id: string;
  title: string;
  startDateTime: string;
  endDateTime: string;  
  location: string;
  timezone: string;
  description?: string;
  slug: string;
}

// toren's note ;)
// this is trying to read events out of a directory, which is a local kind of thing
// is the events directory kept in the public folder uploaded with the site? 
// I forget how but I'm pretty sure there's a similar way to loop over all of those. Nextjs probably has something built in

export function getAllEvents(): Event[] {
  const eventsDirectory = path.join(process.cwd(), 'src/content/events');
  
  if (!fs.existsSync(eventsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(eventsDirectory)
    .filter(name => name.endsWith('.md'));

  const events: Event[] = fileNames.map((fileName) => {
    const fullPath = path.join(eventsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const { data, content } = matter(fileContents);
    const slug = fileName.replace(/\.md$/, '');
    
    return {
      id: slug,
      title: data.title,
      startDateTime: data.startDateTime,
      endDateTime: data.endDateTime || data.endTime,
      location: data.location,
      timezone: data.timezone,
      description: content,
      slug,
    };
  });

  return events.sort((a, b) => 
    new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()
  );
}


export function getNextEvent(): Event | null {
  const allEvents = getAllEvents();
  const now = new Date();
  
  const upcomingEvents = allEvents.filter(event => 
    new Date(event.startDateTime) > now
  );
  
  return upcomingEvents.length > 0 ? upcomingEvents[0] : null;
}

export function getUpcomingEvents(excludeNext: boolean = false): Event[] {
  const allEvents = getAllEvents();
  const now = new Date();
  
  let upcomingEvents = allEvents.filter(event => 
    new Date(event.startDateTime) > now
  );
  
  if (excludeNext && upcomingEvents.length > 0) {
    upcomingEvents = upcomingEvents.slice(1);
  }
  
  return upcomingEvents;
}