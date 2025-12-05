"use client";
import { useState, useEffect } from 'react';

export default function MetaFinanceira() {
  const [ganhoDesejado, setGanhoDesejado] = useState(50000);
  const [percLucro, setPercLucro] = useState(35);
  const [percGanhos, setPercGanhos] = useState(25);
  const [percRendimento, setPercRendimento] = useState(12);
  const [showConfig, setShowConfig] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(timer);
  }, [ganhoDesejado, percLucro, percGanhos, percRendimento]);

  const lucroMensal = ganhoDesejado / (percGanhos / 100);
  const faturamentoMensal = lucroMensal / (percLucro / 100);
  const economiaMensal = lucroMensal * ((100 - percGanhos) / 100);
  const economiaAnual = economiaMensal * 12;
  const investimentoNecessario = ganhoDesejado / (percRendimento / 100 / 12);
  const anosIndependencia = investimentoNecessario / economiaAnual;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatYears = (years: number) => {
    const y = Math.floor(years);
    const m = Math.round((years - y) * 12);
    if (y === 0) return `${m} meses`;
    if (m === 0) return `${y} ${y === 1 ? 'ano' : 'anos'}`;
    return `${y} ${y === 1 ? 'ano' : 'anos'} e ${m} ${m === 1 ? 'mês' : 'meses'}`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#fff',
      padding: '40px 20px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        .card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; backdrop-filter: blur(20px); }
        .glow { box-shadow: 0 0 60px rgba(99, 102, 241, 0.15), 0 0 100px rgba(99, 102, 241, 0.05); }
        .number { font-family: 'Space Mono', monospace; font-weight: 700; letter-spacing: -0.02em; }
        .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(255,255,255,0.5); font-weight: 600; }
        .highlight { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        input[type="range"] { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 3px; background: rgba(255,255,255,0.1); outline: none; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); cursor: pointer; box-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
        .config-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); padding: 10px 20px; border-radius: 12px; cursor: pointer; font-size: 13px; transition: all 0.2s; }
        .config-btn:hover { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.9); }
      `}</style>

      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 700, marginBottom: 12, lineHeight: 1.2 }}>
            Calculadora de<br/><span className="highlight">Independência Financeira</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>Descubra o que você precisa faturar para viver do seu negócio</p>
        </div>

        <div className="card glow" style={{ padding: 40, marginBottom: 24 }}>
          <div className="label" style={{ marginBottom: 16 }}>Quanto você quer ganhar por mês?</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <span style={{ fontSize: 32, fontWeight: 600, color: 'rgba(255,255,255,0.3)' }}>R$</span>
            <input
              type="text"
              value={ganhoDesejado.toLocaleString('pt-BR')}
              onChange={(e) => {
                const value = parseInt(e.target.value.replace(/\D/g, '')) || 0;
                setGanhoDesejado(Math.min(value, 10000000));
              }}
              style={{ background: 'transparent', border: 'none', fontSize: 'clamp(40px, 10vw, 72px)', fontFamily: "'Space Mono', monospace", fontWeight: 700, color: '#fff', width: '100%', outline: 'none' }}
            />
          </div>
          <input type="range" min="5000" max="500000" step="5000" value={ganhoDesejado} onChange={(e) => setGanhoDesejado(parseInt(e.target.value))} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            <span>R$ 5.000</span><span>R$ 500.000</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 24 }}>
          <div className="card" style={{ padding: 28 }}>
            <div className="label" style={{ marginBottom: 8 }}>Faturamento Necessário</div>
            <div className="number" style={{ fontSize: 28, marginBottom: 4 }}>{formatCurrency(faturamentoMensal)}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{formatCurrency(faturamentoMensal * 12)}/ano</div>
          </div>
          <div className="card" style={{ padding: 28 }}>
            <div className="label" style={{ marginBottom: 8 }}>Lucro Mensal</div>
            <div className="number" style={{ fontSize: 28, marginBottom: 4 }}>{formatCurrency(lucroMensal)}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{percLucro}% do faturamento</div>
          </div>
          <div className="card" style={{ padding: 28 }}>
            <div className="label" style={{ marginBottom: 8 }}>Você Retira</div>
            <div className="number highlight" style={{ fontSize: 28, marginBottom: 4 }}>{formatCurrency(ganhoDesejado)}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{percGanhos}% do lucro</div>
          </div>
          <div className="card" style={{ padding: 28 }}>
            <div className="label" style={{ marginBottom: 8 }}>Economia/Caixa</div>
            <div className="number" style={{ fontSize: 28, marginBottom: 4 }}>{formatCurrency(economiaMensal)}</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{100 - percGanhos}% do lucro</div>
          </div>
        </div>

        <div className="card glow" style={{ padding: 40, textAlign: 'center', marginBottom: 24, background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.1) 100%)', border: '1px solid rgba(99,102,241,0.2)' }}>
          <div className="label" style={{ marginBottom: 12 }}>Para viver de renda com {formatCurrency(ganhoDesejado)}/mês</div>
          <div className="number" style={{ fontSize: 'clamp(32px, 8vw, 56px)', marginBottom: 8 }}>{formatCurrency(investimentoNecessario)}</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>investidos a {percRendimento}% a.a.</div>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.05)', padding: '16px 32px', borderRadius: 16 }}>
            <div className="label" style={{ marginBottom: 4 }}>Tempo até a liberdade</div>
            <div className="number highlight" style={{ fontSize: 32 }}>{formatYears(anosIndependencia)}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>economizando {formatCurrency(economiaAnual)}/ano</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <button className="config-btn" onClick={() => setShowConfig(!showConfig)}>
            {showConfig ? '✕ Fechar configurações' : '⚙ Ajustar percentuais'}
          </button>
        </div>

        {showConfig && (
          <div className="card" style={{ padding: 32 }}>
            <div style={{ display: 'grid', gap: 24 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span className="label">Margem de Lucro</span>
                  <span className="number" style={{ fontSize: 16 }}>{percLucro}%</span>
                </div>
                <input type="range" min="10" max="80" value={percLucro} onChange={(e) => setPercLucro(parseInt(e.target.value))} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span className="label">% Retirada (do lucro)</span>
                  <span className="number" style={{ fontSize: 16 }}>{percGanhos}%</span>
                </div>
                <input type="range" min="10" max="90" value={percGanhos} onChange={(e) => setPercGanhos(parseInt(e.target.value))} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span className="label">Rendimento Anual</span>
                  <span className="number" style={{ fontSize: 16 }}>{percRendimento}%</span>
                </div>
                <input type="range" min="4" max="20" value={percRendimento} onChange={(e) => setPercRendimento(parseInt(e.target.value))} />
              </div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 40, fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>RECONECTA · Calculadora de Meta Financeira</div>
      </div>
    </div>
  );
}
