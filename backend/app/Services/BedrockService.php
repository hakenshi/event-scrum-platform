<?php

namespace App\Services;

use Aws\BedrockRuntime\BedrockRuntimeClient;
use Illuminate\Support\Facades\Log;

class BedrockService
{
    private BedrockRuntimeClient $client;

    public function __construct()
    {
        $this->client = new BedrockRuntimeClient([
            'region' => config('services.aws.region'),
            'version' => 'latest',
            'credentials' => [
                'key' => config('services.aws.key'),
                'secret' => config('services.aws.secret'),
            ],
        ]);
    }

    public function generateScrumBoard(array $eventData): array
    {
        $prompt = $this->buildPrompt($eventData);
        
        try {
            $response = $this->client->invokeModel([
                'modelId' => config('services.aws.bedrock_model_id'),
                'body' => json_encode([
                    'anthropic_version' => 'bedrock-2023-05-31',
                    'max_tokens' => 4000,
                    'messages' => [
                        [
                            'role' => 'user',
                            'content' => $prompt
                        ]
                    ]
                ])
            ]);

            $result = json_decode($response['body']->getContents(), true);
            return $this->parseResponse($result['content'][0]['text']);
        } catch (\Exception $e) {
            Log::error('Bedrock API Error: ' . $e->getMessage());
            return $this->getFallbackTasks($eventData);
        }
    }

    private function buildPrompt(array $eventData): string
    {
        return "Gere um quadro Scrum para um evento {$eventData['type']} chamado '{$eventData['name']}' com {$eventData['team_size']} pessoas e sprint de {$eventData['sprint_duration']} dias. Objetivos: {$eventData['objectives']}. Retorne JSON com array de tasks contendo: title, description, status (backlog), story_points (1-8), priority (low/medium/high), acceptance_criteria.";
    }

    private function parseResponse(string $response): array
    {
        $json = json_decode($response, true);
        return $json['tasks'] ?? $this->getFallbackTasks([]);
    }

    private function getFallbackTasks(array $eventData): array
    {
        return [
            [
                'title' => 'Planejamento inicial do evento',
                'description' => 'Definir escopo e objetivos principais',
                'status' => 'backlog',
                'story_points' => 3,
                'priority' => 'high',
                'acceptance_criteria' => 'Documento de escopo aprovado'
            ],
            [
                'title' => 'Definir cronograma',
                'description' => 'Criar timeline detalhado das atividades',
                'status' => 'backlog',
                'story_points' => 2,
                'priority' => 'medium',
                'acceptance_criteria' => 'Cronograma validado pela equipe'
            ]
        ];
    }
}