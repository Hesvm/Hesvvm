import type { Project } from '@/types/project';

export type FrameItem = {
  id: string;
  title: string;
  image: string;
  projectSlug: string;
  projectName: string;
  category?: string;
  aspectRatio?: string;
};

// Deterministic PRNG shuffle to interleave frames randomly without project grouping,
// while remaining 100% stable between SSR and client hydration.
function seededShuffle<T>(array: T[], seed = 98765): T[] {
  const result = [...array];
  let s = seed;
  const random = () => {
    let t = (s += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function extractFramesFromProjects(projects: Project[]): FrameItem[] {
  const frames: FrameItem[] = [];
  const seenImages = new Set<string>();

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
        });
      }
    });
  }

  return seededShuffle(frames);
}
