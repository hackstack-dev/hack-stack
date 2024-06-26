'use client'
import React from 'react'

const COUNT = 200
const SPEED = 0.05

class Star {
  x: number
  y: number
  z: number
  xPrev: number
  yPrev: number

  constructor(x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
    this.xPrev = x
    this.yPrev = y
  }

  update(width: number, height: number, speed: number): void {
    this.xPrev = this.x
    this.yPrev = this.y
    this.z += speed * 0.0675
    this.x += this.x * (speed * 0.0225) * this.z
    this.y += this.y * (speed * 0.0225) * this.z
    if (
      this.x > width / 2 ||
      this.x < -width / 2 ||
      this.y > height / 2 ||
      this.y < -height / 2
    ) {
      this.x = Math.random() * width - width / 2
      this.y = Math.random() * height - height / 2
      this.xPrev = this.x
      this.yPrev = this.y
      this.z = 0
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.lineWidth = this.z
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.xPrev, this.yPrev)
    ctx.stroke()
  }
}

const Starfield = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    const stars: Star[] = Array.from({ length: COUNT }, () => new Star())
    let rafId: number

    const setup = (): void => {
      if (!ctx) return

      const container = canvas
      if (!container) return
      const { clientWidth: width, clientHeight: height } = container
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)

      for (const star of stars) {
        star.x = Math.random() * width - width / 2
        star.y = Math.random() * height - height / 2
        star.z = 0
      }

      ctx.translate(width / 2, height / 2)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
      ctx.strokeStyle = 'white'
      rafId = requestAnimationFrame(frame)
    }

    const frame = (): void => {
      if (!ctx || !canvas?.parentElement) return
      const { clientWidth: width, clientHeight: height } = canvas.parentElement

      ctx.fillRect(-width / 2, -height / 2, width, height)

      for (const star of stars) {
        star.update(width, height, SPEED)
        star.draw(ctx)
      }

      rafId = requestAnimationFrame(frame)
    }

    const resizeObserver = new ResizeObserver(setup)
    if (!canvas) return
    resizeObserver.observe(canvas?.parentElement as Element)

    setup()

    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas ref={canvasRef} id="starfield-canvas" className="h-full w-full" />
  )
}

export default Starfield
