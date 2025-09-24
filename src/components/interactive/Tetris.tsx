"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * Tetris – Canvas-based, dependency-free.
 * Props:
 *  - width, height: tamaño del canvas en px
 *  - block: tamaño de bloque en px (grid size = width/block x height/block)
 *  - tickMs: milisegundos por “caída” (menor = más rápido)
 *  - showHUD: muestra marcador/controles
 */
type TetrisProps = {
  width?: number;
  height?: number;
  block?: number;
  tickMs?: number;
  showHUD?: boolean;
  className?: string;
};

type Cell = 0 | 1;
type Matrix = Cell[][];
type Point = { x: number; y: number };

const PIECES: Matrix[] = [
  // I
  [
    [1, 1, 1, 1],
  ],
  // O
  [
    [1, 1],
    [1, 1],
  ],
  // T
  [
    [1, 1, 1],
    [0, 1, 0],
  ],
  // S
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  // Z
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  // J
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  // L
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
];

function rotate(m: Matrix): Matrix {
  const rows = m.length;
  const cols = m[0].length;
  const res: Matrix = Array.from({ length: cols }, () => Array(rows).fill(0) as Cell[]);
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) res[x][rows - 1 - y] = m[y][x];
  return res;
}

function randomPiece(): Matrix {
  return JSON.parse(JSON.stringify(PIECES[Math.floor(Math.random() * PIECES.length)]));
}

export default function Tetris({
  width = 320,
  height = 480,
  block = 20,
  tickMs = 550,
  showHUD = true,
  className = "",
}: TetrisProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const cols = Math.floor(width / block);
  const rows = Math.floor(height / block);

  const [grid, setGrid] = useState<Matrix>(() =>
    Array.from({ length: rows }, () => Array(cols).fill(0) as Cell[])
  );
  const [piece, setPiece] = useState<Matrix>(randomPiece);
  const [pos, setPos] = useState<Point>({ x: Math.floor(cols / 2) - 1, y: 0 });
  const [score, setScore] = useState(0);
  const pointsPerLevel = 200; // sube un nivel cada 200 puntos
  const level = Math.floor(score / pointsPerLevel);
  const effectiveTick = Math.max(100, Math.round(tickMs * Math.pow(0.96, level))); // ~4% más rápido por nivel, mínimo 100ms
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const colors = ["#0ea5e9", "#22c55e", "#f97316", "#a855f7", "#eab308", "#ef4444", "#14b8a6"];

  const collide = useCallback(
    (g: Matrix, p: Matrix, o: Point) => {
      for (let y = 0; y < p.length; y++) {
        for (let x = 0; x < p[y].length; x++) {
          if (p[y][x] && (g[y + o.y]?.[x + o.x] ?? 1)) return true;
        }
      }
      return false;
    },
    []
  );

  const merge = useCallback((g: Matrix, p: Matrix, o: Point): Matrix => {
    const ng = g.map((r) => r.slice()) as Matrix;
    for (let y = 0; y < p.length; y++) {
      for (let x = 0; x < p[y].length; x++) {
        if (p[y][x]) ng[y + o.y][x + o.x] = 1;
      }
    }
    return ng;
  }, []);

  const clearLines = useCallback((g: Matrix): [Matrix, number] => {
    let cleared = 0;
    const ng = g.filter((row) => {
      const full = row.every((c) => c === 1);
      if (full) cleared++;
      return !full;
    });
    while (ng.length < rows) ng.unshift(Array(cols).fill(0) as Cell[]);
    return [ng, cleared];
  }, [cols, rows]);

  const hardDrop = useCallback(() => {
    if (gameOver || !running || !hasStarted) return;
    let off = 0;
    while (!collide(grid, piece, { x: pos.x, y: pos.y + off + 1 })) off++;
    const y = pos.y + off;
    const merged = merge(grid, piece, { x: pos.x, y });
    const [clearedGrid, lines] = clearLines(merged);
    setGrid(clearedGrid);
    if (lines > 0) setScore((s) => s + [0, 100, 300, 500, 800][lines]);
    // spawn new
    const np = randomPiece();
    const start = { x: Math.floor(cols / 2) - Math.ceil(np[0].length / 2), y: 0 };
    if (collide(clearedGrid, np, start)) {
      setGameOver(true);
      setRunning(false);
    } else {
      setPiece(np);
      setPos(start);
    }
  }, [grid, piece, pos, merge, clearLines, collide, cols, gameOver, running, hasStarted]);

  // Game loop (gravity)
  useEffect(() => {
    if (!running || gameOver || !hasStarted) return;
    const id = setInterval(() => {
      setPos((p0) => {
        const p1 = { x: p0.x, y: p0.y + 1 };
        if (collide(grid, piece, p1)) {
          // Merge + new piece
          const merged = merge(grid, piece, p0);
          const [clearedGrid, lines] = clearLines(merged);
          setGrid(clearedGrid);
          if (lines > 0) setScore((s) => s + [0, 100, 300, 500, 800][lines]);
          const np = randomPiece();
          const start = { x: Math.floor(cols / 2) - Math.ceil(np[0].length / 2), y: 0 };
          if (collide(clearedGrid, np, start)) {
            setGameOver(true);
            setRunning(false);
          } else {
            setPiece(np);
            setPos(start);
          }
          return p0;
        }
        return p1;
      });
    }, effectiveTick);
    return () => clearInterval(id);
  }, [effectiveTick, running, gameOver, grid, piece, merge, clearLines, collide, cols, hasStarted, level]);

  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!hasStarted) return;
      if (gameOver) return;
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        hardDrop();
        return;
      }
      if (!running) return;
      if (e.key === "ArrowLeft") {
        if (running) e.preventDefault();
        const next = { x: pos.x - 1, y: pos.y };
        if (running && !collide(grid, piece, next)) setPos(next);
      } else if (e.key === "ArrowRight") {
        if (running) e.preventDefault();
        const next = { x: pos.x + 1, y: pos.y };
        if (running && !collide(grid, piece, next)) setPos(next);
      } else if (e.key === "ArrowDown") {
        if (running) e.preventDefault();
        const next = { x: pos.x, y: pos.y + 1 };
        if (running && !collide(grid, piece, next)) setPos(next);
      } else if (e.key === "ArrowUp") {
        if (running) e.preventDefault();
        const r = rotate(piece);
        if (running && !collide(grid, r, pos)) setPiece(r);
      }
    };
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, [pos, grid, piece, collide, gameOver, hardDrop, running, hasStarted]);

  // Draw
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    // Draw settled grid
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (grid[y][x]) {
          ctx.fillStyle = "#0ea5e9";
          ctx.fillRect(x * block, y * block, block - 1, block - 1);
        }
      }
    }

    // Draw current piece (color by shape index)
    const idx = PIECES.findIndex((p) => p[0].length === piece[0].length && p.length === piece.length);
    const color = colors[(idx >= 0 ? idx : 0) % colors.length];
    ctx.fillStyle = color;
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        if (piece[y][x]) {
          ctx.fillRect((pos.x + x) * block, (pos.y + y) * block, block - 1, block - 1);
        }
      }
    }

    // Grid lines (subtle)
    ctx.strokeStyle = "rgba(148,163,184,0.15)";
    for (let x = 0; x <= cols; x++) {
      ctx.beginPath();
      ctx.moveTo(x * block + 0.5, 0);
      ctx.lineTo(x * block + 0.5, height);
      ctx.stroke();
    }
    for (let y = 0; y <= rows; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * block + 0.5);
      ctx.lineTo(width, y * block + 0.5);
      ctx.stroke();
    }
  }, [grid, piece, pos, width, height, rows, cols, block]);

  const reset = () => {
    setGrid(Array.from({ length: rows }, () => Array(cols).fill(0) as Cell[]));
    setPiece(randomPiece());
    setPos({ x: Math.floor(cols / 2) - 1, y: 0 });
    setScore(0);
    setGameOver(false);
    setHasStarted(false);
    setRunning(false);
  };

  return (
    <div
      className={[
        "rounded-2xl border border-slate-200/70 bg-white/70 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60 p-4",
        className,
      ].join(" ")}
    >
      {showHUD && (
        <div className="mb-3 flex items-center justify-between text-sm">
          <div className="font-semibold">Tetris</div>
          <div className="flex items-center gap-3">
            <span className="text-slate-500 dark:text-slate-400">Puntuación: {score} · Nivel: {level}</span>
            {!hasStarted ? (
              <button
                onClick={() => { setHasStarted(true); setRunning(true); }}
                className="rounded-md border border-slate-300/70 px-2 py-1 text-xs hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/5"
              >
                Iniciar
              </button>
            ) : (
              <button
                onClick={() => setRunning((r) => !r)}
                className="rounded-md border border-slate-300/70 px-2 py-1 text-xs hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/5"
              >
                {running ? "Pausa" : "Reanudar"}
              </button>
            )}
            <button
              onClick={reset}
              className="rounded-md border border-slate-300/70 px-2 py-1 text-xs hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/5"
            >
              Reiniciar
            </button>
          </div>
        </div>
      )}
      <div className="relative">
        {!hasStarted && !gameOver && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/60 text-white">
            <div className="text-center">
              <div className="mb-2 text-lg font-bold">Tetris</div>
              <p className="mb-3 text-sm opacity-90">Pulsa Iniciar o la barra espaciadora para empezar.</p>
              <button
                onClick={() => { setHasStarted(true); setRunning(true); }}
                className="rounded-md border border-white/30 px-3 py-1 text-sm hover:bg-white/10"
              >
                Iniciar
              </button>
            </div>
          </div>
        )}
        {gameOver && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/60 text-white">
            <div className="text-center">
              <div className="mb-2 text-lg font-bold">¡Game Over!</div>
              <button
                onClick={reset}
                className="rounded-md border border-white/30 px-3 py-1 text-sm hover:bg-white/10"
              >
                Jugar de nuevo
              </button>
            </div>
          </div>
        )}
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="mx-auto block rounded-lg ring-1 ring-inset ring-slate-200 dark:ring-white/10"
          aria-label="Tetris canvas"
        />
        {showHUD && (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Controles: Iniciar (botón), ← → mover, ↑ rotar, ↓ bajar, barra espaciadora soltar.
          </p>
        )}
      </div>
    </div>
  );
}