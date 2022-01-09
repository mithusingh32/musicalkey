#ifndef AUDIOANALYZERADDON_H
#define AUDIOANALYZERADDON_H

#ifndef NAPI_VERSION
#define NAPI_VERSION 6

#include <napi.h>

class AudioAnalyzerAddon : public Napi::Addon<AudioAnalyzerAddon> {
    public: 
        AudioAnalyzerAddon();
        ~AudioAnalyzerAddon();

        Napi::Value getAudioData(const Napi::CallbackInfo &info);
};

#endif
#endif