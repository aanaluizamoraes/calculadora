"use client";
import { useState } from 'react';

export default function MetaFinanceira() {
  const [ganhoDesejado, setGanhoDesejado] = useState(50000);
  const [percLucro, setPercLucro] = useState(35);
  const [percGanhos, setPercGanhos] = useState(25);
  const [percRendimento, setPercRendimento] = useState(12);
  const [showConfig, setShowConfig] = useState(false);
  const [revealed, setRevealed] = useState(false);

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
      background: '#ffffff',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
      color: '#000',
      padding: '60px 24px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        .mono { font-family: 'Space Mono', monospace; }
        .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #999; font-weight: 500; }
        input[type="range"] { -webkit-appearance: none; width: 100%; height: 2px; border-radius: 1px; background: #e0e0e0; outline: none; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: #000; cursor: pointer; }
        .btn { background: #000; color: #fff; border: none; padding: 16px 48px; border-radius: 100px; cursor: pointer; font-size: 15px; font-weight: 500; transition: all 0.2s; }
        .btn:hover { background: #333; }
        .btn-ghost { background: transparent; color: #000; border: 1px solid #e0e0e0; }
        .btn-ghost:hover { background: #f5f5f5; border-color: #ccc; }
        .fade-in { animation: fadeIn 0.8s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .big-number { font-size: clamp(48px, 12vw, 96px); font-weight: 700; letter-spacing: -0.03em; line-height: 1; }
        .card { background: #fafafa; border-radius: 16px; padding: 24px; }
      `}</style>

      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        
        {!revealed ? (
          <>
            {/* Pergunta Inicial */}
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <p className="label" style={{ marginBottom: 16 }}>A pergunta que define tudo</p>
              <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 600, lineHeight: 1.3, marginBottom: 0 }}>
                Quanto você quer<br/>ganhar por mês?
              </h1>
            </div>

            {/* Input */}
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
                <span style={{ fontSize: 32, fontWeight: 300, color: '#999' }}>R$</span>
                <input
                  type="text"
                  value={ganhoDesejado.toLocaleString('pt-BR')}
                  onChange={(e) => {
                    const value = parseInt(e.target.value.replace(/\D/g, '')) || 0;
                    setGanhoDesejado(Math.min(value, 10000000));
                  }}
                  className="mono"
                  style={{ background: 'transparent', border: 'none', fontSize: 'clamp(48px, 12vw, 80px)', fontWeight: 700, color: '#000', width: '100%', outline: 'none', textAlign: 'center' }}
                />
              </div>
              <input type="range" min="5000" max="500000" step="5000" value={ganhoDesejado} onChange={(e) => setGanhoDesejado(parseInt(e.target.value))} style={{ maxWidth: 400 }} />
            </div>

            {/* CTA */}
            <div style={{ textAlign: 'center' }}>
              <button className="btn" onClick={() => setRevealed(true)}>
                Descobrir meu número
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Resultado - Tela Instagramável */}
            <div className="fade-in" style={{ textAlign: 'center' }}>
              
              <p className="label" style={{ marginBottom: 8 }}>Para ganhar {formatCurrency(ganhoDesejado)}/mês</p>
              <p style={{ fontSize: 18, color: '#666', marginBottom: 48, fontWeight: 400 }}>esse é o seu número:</p>
              
              {/* O NÚMERO */}
              <div style={{ marginBottom: 16 }}>
                <div className="mono big-number">{formatCurrency(faturamentoMensal)}</div>
                <p style={{ fontSize: 14, color: '#999', marginTop: 8 }}>de faturamento por mês</p>
              </div>

              <div style={{ width: 40, height: 1, background: '#e0e0e0', margin: '40px auto' }}></div>

              {/* Breakdown Minimalista */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40, textAlign: 'left' }}>
                <div className="card">
                  <p className="label" style={{ marginBottom: 4 }}>Lucro mensal</p>
                  <p className="mono" style={{ fontSize: 24, fontWeight: 700 }}>{formatCurrency(lucroMensal)}</p>
                </div>
                <div className="card">
                  <p className="label" style={{ marginBottom: 4 }}>Você retira</p>
                  <p className="mono" style={{ fontSize: 24, fontWeight: 700 }}>{formatCurrency(ganhoDesejado)}</p>
                </div>
                <div className="card">
                  <p className="label" style={{ marginBottom: 4 }}>Sobra pro caixa</p>
                  <p className="mono" style={{ fontSize: 24, fontWeight: 700 }}>{formatCurrency(economiaMensal)}</p>
                </div>
                <div className="card">
                  <p className="label" style={{ marginBottom: 4 }}>Economia/ano</p>
                  <p className="mono" style={{ fontSize: 24, fontWeight: 700 }}>{formatCurrency(economiaAnual)}</p>
                </div>
              </div>

              {/* Liberdade Financeira */}
              <div style={{ background: '#000', color: '#fff', borderRadius: 20, padding: '32px 24px', marginBottom: 32, textAlign: 'center' }}>
                <p className="label" style={{ color: '#666', marginBottom: 4 }}>Liberdade financeira</p>
                <p style={{ fontSize: 14, color: '#999', marginBottom: 16 }}>Para viver de renda com {formatCurrency(ganhoDesejado)}/mês</p>
                <div className="mono" style={{ fontSize: 'clamp(28px, 7vw, 44px)', fontWeight: 700, marginBottom: 8 }}>{formatCurrency(investimentoNecessario)}</div>
                <p style={{ fontSize: 13, color: '#666' }}>investidos a {percRendimento}% a.a.</p>
                <div style={{ width: 40, height: 1, background: '#333', margin: '20px auto' }}></div>
                <p style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>Tempo até lá</p>
                <p className="mono" style={{ fontSize: 28, fontWeight: 700 }}>{formatYears(anosIndependencia)}</p>
              </div>

              {/* Ações */}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn-ghost btn" onClick={() => setRevealed(false)}>Recalcular</button>
                <button className="btn-ghost btn" onClick={() => setShowConfig(!showConfig)}>
                  {showConfig ? 'Fechar' : 'Ajustar %'}
                </button>
              </div>

              {/* Configurações */}
              {showConfig && (
                <div style={{ marginTop: 32, textAlign: 'left' }}>
                  <div className="card" style={{ display: 'grid', gap: 24 }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span className="label">Margem de lucro</span>
                        <span className="mono" style={{ fontWeight: 700 }}>{percLucro}%</span>
                      </div>
                      <input type="range" min="10" max="80" value={percLucro} onChange={(e) => setPercLucro(parseInt(e.target.value))} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span className="label">% retirada do lucro</span>
                        <span className="mono" style={{ fontWeight: 700 }}>{percGanhos}%</span>
                      </div>
                      <input type="range" min="10" max="90" value={percGanhos} onChange={(e) => setPercGanhos(parseInt(e.target.value))} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span className="label">Rendimento anual</span>
                        <span className="mono" style={{ fontWeight: 700 }}>{percRendimento}%</span>
                      </div>
                      <input type="range" min="4" max="20" value={percRendimento} onChange={(e) => setPercRendimento(parseInt(e.target.value))} />
                    </div>
                  </div>
                </div>
              )}

              {/* Footer sutil */}
              <p style={{ marginTop: 48, fontSize: 11, color: '#ccc', letterSpacing: '0.1em' }}>RECONECTA</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
