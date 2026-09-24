import type { Project } from '@/types/project';

export type FrameItem = {
  id: string;
  title: string;
  image: string;
  projectSlug: string;
  projectName: string;
  category?: string;
  aspectRatio: string;
};

// Aspect ratio variations to create organic heights in the 3-column masonry grid
const ASPECT_RATIOS = ['4/3', '3/4', '1/1', '16/10', '4/5', '3/2', '9/16'];

export function extractFramesFromProjects(projects: Project[]): FrameItem[] {
  const frames: FrameItem[] = [];
  const seenImages = new Set<string>();
  let ratioIdx = 0;

  for (const project of projects) {
    const projectImages: { src: string; title: string; id: string }[] = [];

    // Thumbnail
    if (project.thumbnail_url && !project.thumbnail_url.includes('avatar')) {
      projectImages.push({
        id: `frame-${project.slug}-thumb`,
        title: project.title,
        src: project.thumbnail_url,
      });
    }

    // Blocks
    if (project.blocks && Array.isArray(project.blocks)) {
      project.blocks.forEach((block, idx) => {
        if (block.type === 'image' && block.src && !block.src.includes('avatar')) {
          projectImages.push({
            id: `frame-${project.slug}-img-${idx}`,
            title: block.subtitle || project.title,
            src: block.src,
          });
        } else if (block.type === 'image-pair') {
          if (block.left?.src && !block.left.src.includes('avatar')) {
            projectImages.push({
              id: `frame-${project.slug}-left-${idx}`,
              title: block.left.subtitle || project.title,
              src: block.left.src,
            });
          }
          if (block.right?.src && !block.right.src.includes('avatar')) {
            projectImages.push({
              id: `frame-${project.slug}-right-${idx}`,
              title: block.right.subtitle || project.title,
              src: block.right.src,
            });
          }
        }
      });
    }

    projectImages.forEach((item) => {
      const key = `${project.slug}-${item.src}`;
      if (!seenImages.has(key)) {
        seenImages.add(key);
        frames.push({
          id: item.id,
          title: item.title,
          image: item.src,
          projectSlug: project.slug,
          projectName: project.title,
          category: project.category || 'Project',
          aspectRatio: ASPECT_RATIOS[ratioIdx % ASPECT_RATIOS.length],
        });
        ratioIdx++;
      }
    });
  }

  return frames;
}
