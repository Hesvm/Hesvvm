'use client'

import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { ContentBlock } from '@/types/project'
import { SortableBlock } from './SortableBlock'
import TextBlock from './blocks/TextBlock'
import TitleBlock from './blocks/TitleBlock'
import ImageBlock from './blocks/ImageBlock'
import ImagePairBlock from './blocks/ImagePairBlock'
import DividerBlock from './blocks/DividerBlock'
import LinkBlock from './blocks/LinkBlock'
import VideoBlock from './blocks/VideoBlock'
import QuoteBlock from './blocks/QuoteBlock'

interface Props {
  blocks: ContentBlock[]
  onChange: (blocks: ContentBlock[]) => void
  isReordering: boolean
  selectedBlockId: string | null
  onSelectBlock: (id: string) => void
  slug: string
}

export default function BlockEditor({
  blocks,
  onChange,
  isReordering,
  selectedBlockId,
  onSelectBlock,
  slug,
}: Props) {
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 8 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } })
  const sensors = useSensors(mouseSensor, touchSensor)

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex(b => b.id === active.id)
      const newIndex = blocks.findIndex(b => b.id === over.id)
      onChange(arrayMove(blocks, oldIndex, newIndex))
    }
  }

  function updateBlock(updated: ContentBlock) {
    onChange(blocks.map(b => (b.id === updated.id ? updated : b)))
  }

  function deleteBlock(id: string) {
    onChange(blocks.filter(b => b.id !== id))
  }

  function renderBlock(block: ContentBlock, dragHandleProps: Record<string, unknown>) {
    const isSelected = block.id === selectedBlockId
    const selectedStyle: React.CSSProperties = isSelected
      ? { borderLeft: '2px solid #3b82f6', borderRadius: 8 }
      : {}

    const wrapper = (children: React.ReactNode) => (
      <div
        style={selectedStyle}
        onClick={() => onSelectBlock(block.id)}
      >
        {children}
      </div>
    )

    switch (block.type) {
      case 'text':
        return wrapper(
          <TextBlock
            block={block}
            onChange={updateBlock}
            onDelete={() => deleteBlock(block.id)}
            isReordering={isReordering}
            dragHandleProps={dragHandleProps}
          />
        )
      case 'title':
        return wrapper(
          <TitleBlock
            block={block}
            onChange={updateBlock}
            onDelete={() => deleteBlock(block.id)}
            isReordering={isReordering}
            dragHandleProps={dragHandleProps}
          />
        )
      case 'image':
        return wrapper(
          <ImageBlock
            block={block}
            onChange={updateBlock}
            onDelete={() => deleteBlock(block.id)}
            isReordering={isReordering}
            slug={slug}
            dragHandleProps={dragHandleProps}
          />
        )
      case 'image-pair':
        return wrapper(
          <ImagePairBlock
            block={block}
            onChange={updateBlock}
            onDelete={() => deleteBlock(block.id)}
            isReordering={isReordering}
            slug={slug}
            dragHandleProps={dragHandleProps}
          />
        )
      case 'divider':
        return wrapper(
          <DividerBlock
            block={block}
            onDelete={() => deleteBlock(block.id)}
            dragHandleProps={dragHandleProps}
          />
        )
      case 'link':
        return wrapper(
          <LinkBlock
            block={block}
            onChange={updateBlock}
            onDelete={() => deleteBlock(block.id)}
            isReordering={isReordering}
            dragHandleProps={dragHandleProps}
          />
        )
      case 'video':
        return wrapper(
          <VideoBlock
            block={block}
            onChange={updateBlock}
            onDelete={() => deleteBlock(block.id)}
            isReordering={isReordering}
            dragHandleProps={dragHandleProps}
          />
        )
      case 'quote':
        return wrapper(
          <QuoteBlock
            block={block}
            onChange={updateBlock}
            onDelete={() => deleteBlock(block.id)}
            isReordering={isReordering}
            dragHandleProps={dragHandleProps}
          />
        )
      default:
        return null
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {blocks.map(block => (
            <SortableBlock key={block.id} id={block.id}>
              {(dragHandleProps) => renderBlock(block, dragHandleProps)}
            </SortableBlock>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
