import { Request, Response, NextFunction } from "express";

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export type RapidGetSubmissionType = {
  source_code: string;
  language_id: string;
  stdin: string;
  expected_output: string | null;
  stdout: string;
  status_id: string;
  created_at: Date;
  finished_at: Date;
  time: string;
  memory: string;
  stderr: string | null;
  token: string;
  number_of_runs: string;
  cpu_time_limit: string;
  cpu_extra_time: string;
  wall_time_limit: string;
  memory_limit: string;
  stack_limit: string;
  max_processes_and_or_threads: string;
  enable_per_process_and_thread_time_limit: boolean;
  enable_per_process_and_thread_memory_limit: boolean;
  max_file_size: string;
  compile_output: string | null;
  exit_code: string;
  exit_signal: string | null;
  message: string | null;
  wall_time: string;
  compiler_options: string;
  command_line_arguments: string;
  redirect_stderr_to_stdout: boolean;
  callback_url: string | null;
  additional_files: string | null;
  enable_network: boolean;
  status: {
    id: string;
    description: string;
  };
  language: {
    id: string;
    name: string;
  };
};
