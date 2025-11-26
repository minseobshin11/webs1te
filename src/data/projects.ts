export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  period: string;
  links: ProjectLink[];
  buildingType: 'modern' | 'classic' | 'industrial' | 'residential';
}

export const projects: Project[] = [
  {
    id: 'meoow-processor',
    title: 'MeOoOw Processor',
    description: 'Out-of-Order Execution RISC Processor with superscalar architecture',
    longDescription: 'Design and implement a superscalar Out-of-Order (OoO) RISC processor featuring explicit register renaming, dynamic scheduling, and reorder buffer (ROB) for high IPC and efficient instruction-level parallelism.\n\nVerified individual components through directed tests and constrained-random verification in SystemVerilog, leveraging the Synopsys toolchain for simulation, synthesis, waveform analysis, and timing closure.',
    technologies: ['SystemVerilog', 'Computer Architecture', 'Microarchitecture'],
    period: 'Sept 2025 – Present',
    links: [],
    buildingType: 'modern',
  },
  {
    id: 'gpt2-cuda',
    title: 'GPT-2 CUDA Acceleration',
    description: 'Custom CUDA kernels for GPT-2 inference optimization',
    longDescription: 'Implement and optimize custom CUDA kernels for GPT-2 inference, applying various GPU optimizations such as shared memory tiling, memory coalescing, warp-level parallelism, and Tensor Core acceleration to achieve substantial speedups over CPU baselines.\n\nConduct detailed system-level and kernel-level profiling using NVIDIA Nsight Systems and Nsight Compute, identifying performance bottlenecks, memory stalls, and occupancy issues to guide iterative kernel optimization.\n\nAnalyze GPU memory hierarchies, occupancy, and execution divergence, gaining deep insight into transformer model performance characteristics on modern GPUs.',
    technologies: ['CUDA', 'GPU Acceleration', 'Deep Learning', 'Nsight Systems'],
    period: 'Sept 2025 – Present',
    links: [],
    buildingType: 'industrial',
  },
  {
    id: 'cosmos-os',
    title: 'CosmOS',
    description: 'Operating System built from scratch inspired by Unix V6',
    longDescription: 'Collaborated in a team of three to develop core OS subsystems, including interrupt handling, user-level threading, and kernel/application paging, inspired by Unix Version 6.\n\nImplemented a custom, block-based filesystem with full CRUD functionality (create, read, update, delete) and a caching system for improved I/O performance.\n\nBuilt virtual memory management using the RISC-V Sv39 paging scheme, with lazy allocation and page fault handling to optimize memory utilization and process isolation.',
    technologies: ['C', 'Operating Systems', 'RISC-V', 'Systems Programming'],
    period: 'Jul 2025 – Aug 2025',
    links: [],
    buildingType: 'classic',
  },
  {
    id: 'music-synthesizer',
    title: 'Music Synthesizer',
    description: 'Real-time music synthesizer with HDMI output on FPGA',
    longDescription: 'Designed and implemented a real-time music synthesizer and playback system on FPGA, supporting multi-track composition and HDMI-based visual feedback.\n\nDeveloped a custom embedded architecture utilizing BRAM to store multi-track note data, integrating keyboard input and on-screen note visualization to enable synchronized playback and an interactive, real-time composition experience.\n\nVerified correct functionality using the Xilinx Vivado waveform viewer and hardware logic analyzers, ensuring valid BRAM access, accurate HDMI timing, and glitch-free audio output.',
    technologies: ['SystemVerilog', 'C', 'FPGA Design', 'Xilinx Vivado'],
    period: 'Apr 2025 – May 2025',
    links: [],
    buildingType: 'residential',
  },
];
